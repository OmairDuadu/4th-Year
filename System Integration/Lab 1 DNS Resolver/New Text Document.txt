import dns

import socket

import ipaddress



def split_info(data):

    final = " " 

    for part in data:

        final+=str(part)+"."

    return final[:-1]



question = dns.DNSQuestion(

    qname = ['google', 'ie'],

    qtype = 28, #QTYPE A

    qclass = 1

)



header = dns.DNSHeader(

    ident = 1000,

    qr = 0,

    opcode = 0,

    aa = 0,

    tc = 0,

    rd = 1, #Request recursion

    ra = 0,

    z = 0,

    rcode = 0,

    qdcount = 1, #We have one question!

    ancount = 0,

    nscount = 0,

    arcount = 0

)



datagram = dns.DNSDatagram(

    header = header,

    questions = [question],

    answers = []

)



datagram_bytes = dns.make_dns_datagram(datagram)



destination = (input('Enter IP Address: '), 53)

connection = socket.socket(family=socket.AF_INET, type=socket.SOCK_DGRAM)

connection.sendto(datagram_bytes, destination)



result = dns.read_dns_datagram(connection.recvfrom(4096)[0])

for answer in result.answers:

   # print(split_info(answer.rdata))

    print(ipaddress.IPv6Address(answer.rdata))




