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
#include <pthread.h>
#include <stdlib.h>
#include <pwd.h>
#include <grp.h>
#include <error.h>
#include <errno.h>
#define LENGTH 1000

pthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER;

void *serverTransfer(void *client){
    // All buffers used throughout program
    int clientSocket = *((int*)client);
    char message[500];
    int readSize;
    char command[50];
    char responseOk[] = "File transfered";
    char responseFail[] = "File did not transfer";
    char userid[5];
    char groupid[5];
    

    // Displaying the User id
    printf("User id is now %d\n",getuid());
    if(readSize = recv(clientSocket,userid,4,0) < 0)
    {
        printf("Did not recieve userid\n");
    }
    if(readSize = recv(clientSocket,groupid,4,0) < 0)
    {
        printf("Did not recieve groupid\n");
    }
    
    //getting user & group id and displaying in server terminal
    uid_t user = atoi(userid);
    gid_t group = atoi(groupid);
    uid_t uid = getuid();
    gid_t gid = getgid();
    printf("User id gotten %d\n",user);
    printf("This is the group id : %s\n",groupid);
    struct passwd *pws;
    pws = getpwuid(user);
    printf("user name is %s\n\n",pws->pw_name);
    
    // Finding the Groups 
    int ngroups;
    gid_t *groups;
    ngroups = 10;
    gid_t supp_groups[ngroups];
    groups = malloc(ngroups*sizeof(gid_t));

    // getting the clients's IDs
    if(getgrouplist(pws->pw_name,group,groups,&ngroups) == -1){
        printf("Error in getting groups\n\n");
    }
    for(int i = 0; i < ngroups; i++){
       supp_groups[i] = groups[i];
       printf("Group name : %d\n\n",supp_groups[i]);
      
    }

    // receive file and folder from client
    recv(clientSocket,message,500,0);
    // check ID, should be root
    system("id");
    // set mutext lock
    pthread_mutex_lock(&lock);
   
   // Switch server Id to that of the client ID
    setgroups(ngroups,supp_groups);
   
    setreuid(user,uid);
    setregid(group,gid);
    seteuid(user);
    setegid(group);
    setgid(group);
    
    // show ID has changed to user
    printf("my id is now %d\n",getuid());
    printf("my group is now %d from %d\n",getgid(),group);
    system("id");

    // unlock mutex
    pthread_mutex_unlock(&lock);
  
    // sending the file file
    char* fr_path = "/home/jombo/Desktop/CA2/";
    char revbuf[LENGTH]; // Receiver buffer
    char * fr_name = (char *) malloc(1 + strlen(fr_path) + strlen(message) );
    strcpy(fr_name, fr_path);
    strcat(fr_name, message);
    FILE *fr = fopen(fr_name, "w");

    printf("%s\n",fr_name);
    if(fr == NULL)
    {   printf("\nFile %s Cannot be opened file on server.\n\n", fr_name);
        send(clientSocket,responseFail,500,0);
    }
    else {
        bzero(revbuf, LENGTH);
        int fr_block_sz = 0;
        int i=0;
        while((fr_block_sz = recv(clientSocket, revbuf, LENGTH, 0)) > 0) 
        { 
            
            printf("Data Received %d = %d\n",i,fr_block_sz);
            int write_sz = fwrite(revbuf, sizeof(char), fr_block_sz, fr);
            if(write_sz < fr_block_sz)
            perror("File write failed on server.\n\n");
            bzero(revbuf, LENGTH);
            i++;
            if(fr_block_sz < LENGTH)
            break;
        
        }
        if(fr_block_sz < 0) {
          if (errno == EAGAIN)
            printf("recv() timed out.\n\n");
          else {
            fprintf(stderr, "recv() failed due to errno = %d\n\n", errno);
            exit(1);
        }
    }
    //confirmationxx
    printf("Ok File received from client!\n\n");
    send(clientSocket,responseOk,500,0);
    fclose(fr);
    }
    memset(message,0,500);
 
    // Switches back to root
    user = 0;
    group = 0;
    setreuid(0,uid);
    setregid(0,gid);
    seteuid(0);
    setegid(0);

    setgid(0);
    setuid(0);
    printf("My E user id is %d",geteuid());
    system("id");
   

    if(readSize == 0){
        puts("Client disconnected\n");
        fflush(stdout);
    }else if(readSize == -1){
        perror("Read error\n");
    }
   
   
    // close socket and terminate thread
    close(clientSocket);
    pthread_exit(NULL);
    
}

int main(int argc, char *argv[])
{
    // socket descriptor
    int sock;
    int clientSocket;
    int connSize;
    int readSize;

    struct sockaddr_in server,client;
    char message[500];

    // create socket
    sock = socket(AF_INET,SOCK_STREAM,0);
    if(sock== -1)
        printf("Could not create socket");
    else
        printf("Socket Created\n");

    server.sin_port = htons(8085);
    server.sin_family = AF_INET;
    server.sin_addr.s_addr = INADDR_ANY;

    // Binding socket
    if(bind(sock,(struct sockaddr *)&server,sizeof(server)) < 0){
        perror("Bind failed");
        return 1;
    }else
    {
        printf("Bind Sucess\n");
    }

    printf("Waiting for incoming Client >>\n");

    // listening on socket
    listen(sock,3);

    // Accepting client connection
    connSize = sizeof(struct sockaddr_in);
    while (1)
    {
        clientSocket = accept(sock,(struct sockaddr *)&client,(socklen_t*)&connSize);
        if(clientSocket < 0)
        {
            perror("Can not accept connection");
            return 1;
        }else
        {
            printf("Client has connected\n");
        }
        // create thread
        pthread_t thread;
        int *clientThread = malloc(sizeof(int));
        *clientThread = clientSocket;
        pthread_create(&thread,NULL,serverTransfer,(void*)clientThread);
    }
    
    return 0;
    
}