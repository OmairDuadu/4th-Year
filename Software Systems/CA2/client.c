//Author: Omair Duadu
//Date: 26/11/2021
//Project: Systems Software CA2
//File: client.c
//Description: Systems Software CA2 Client Server program to transfer 
//             files with monitering of user and access restrictions

#include <stdio.h>
#include <string.h>
#include <sys/socket.h>
#include <arpa/inet.h>
#include <unistd.h>
#include <stdlib.h>
#include <errno.h>
#define LENGTH 1000

int main(int argc, char *argv[])
{
    int SID;
    struct sockaddr_in server;

    // buffers for all of the diffrent 
    char clientMessage[500];
    char serverMessage[500];
    char filename[500];
    char manufacturingDir[] = "Manufacturing/";
    char distributionDir[] = "Distribution/";
    char response[50];
    
    // creating socket
    SID = socket(AF_INET,SOCK_STREAM,0);
    if(SID == -1)
    {
        printf("Unsucceful Socket Creation\n");
    }
    else
    {
        printf("Socket Created Succesfully\n");
    }

    // Fill in addresses sor the server application
    server.sin_port = htons(8085);
    server.sin_family = AF_INET;
    server.sin_addr.s_addr = inet_addr("127.0.0.1");

    // establishing a connection to the server
    if(connect(SID,(struct sockaddr *)&server,sizeof(server)) < 0)
    {
        perror("Failed to establish connection");
        return 1;
    }
    else
    {
        printf("Connection Estabilshed Succesfully\n");
    }

    // arrays to store credentials of user and group
    char userid[5];
    char groupid[5];
    sprintf(userid,"%d",getuid());
    sprintf(groupid,"%d",getgid());

    //sending and printing the credentials to the server 
    //for transfer authentication
    printf(": %s",userid);
    if(send(SID,userid,strlen(userid),0)<0)
    {
        printf("Send failed\n");
        return 1;
    }  
    printf("\nThis group id : %s \n",groupid);
    if(send(SID,groupid,strlen(groupid),0)<0)
    {
        printf("Send failed\n");
        return 1;
    }
    
    // Enter the file name for transfer.
    printf("\nEnter file Name : \n");
    scanf("%s",filename);
        
    int choice;
    // selecting destination directory for transfer or exit
    do{
        printf("\nwhat is the destination folder? ");
        printf("\n1. Manufacturing\n2. Distribution\n3. Exit Transfer \n");
        scanf("%d",&choice);
        switch(choice)
        {
            case 1:
                strcat(manufacturingDir,clientMessage);
                strcpy(clientMessage,manufacturingDir);
                break;
            case 2:
                strcat(distributionDir,clientMessage);
                strcpy(clientMessage,distributionDir);
                break;
            case 3:
                strcpy(clientMessage,"Exit\n");
                exit(1);
            default:
                printf("Invalid option\n");
                break;
        }
    }
    
    while(choice < 1 || choice > 4);
    strcat(clientMessage,filename);
    
    // retrieving the file for transfer
    char* fs_path = "/home/jombo/Desktop/CA2/Client/";

    char * fs_name = (char *) malloc(1 + strlen(fs_path)+ strlen(filename) );
    strcpy(fs_name, fs_path);
    strcat(fs_name, filename);

    //Checking if file even existence :)
    char sdbuf[LENGTH];
    printf("[Client] Sending %s to the Server... ", fs_name);
    FILE *fs = fopen(fs_name, "r");
    if(fs == NULL) 
    {
      printf("ERROR: File %s not found.\n", fs_name);
      return 1;
    }
    
    bzero(sdbuf, LENGTH);
    int fs_block_sz,i=0;
    // send file
    send(SID,clientMessage,500,0);
    while((fs_block_sz = fread(sdbuf, sizeof(char), LENGTH, fs)) > 0) 
    {
       printf("Data Sent %d = %d\n",i,fs_block_sz);
       if(send(SID, sdbuf, fs_block_sz, 0) < 0) {
         fprintf(stderr, "ERROR: Failed to send file %s. (errno = %d)\n", fs_name, errno);
         exit(1);
        }
       bzero(sdbuf, LENGTH);
       i++;
    }

    // recieve response
    recv(SID,response,50,0);
    printf("%s",response);
    
    // close socket
    close(SID);
    return 0;

}
