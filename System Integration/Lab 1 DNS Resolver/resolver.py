import dns, socket, sys


def do_dns_query(do_ipv6):
    question = dns.DNSQuestion(
        qname = sys.argv[1].split('.'),
        qtype = 1 if not do_ipv6 else 28,
        qclass = 1
    )


    header = dns.DNSHeader(
        ident = 1000,
        qr = 0,
        opcode = 0,
        aa = 0,
        tc = 0,
        rd = 1,
        ra = 0,
        z = 0,
        rcode = 0,
        qdcount = 1,
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


    destination = ('127.0.0.53', 53)
    connection = socket.socket(family=socket.AF_INET, type=socket.SOCK_DGRAM)
    connection.sendto(datagram_bytes, destination)
    result = connection.recvfrom(4096)[0]
    return dns.read_dns_datagram(result)

result = do_dns_query(False)
for answer in result.answers:
    if answer.dns_type != 1: continue
    r = answer.rdata
    print(f'{r[0]}.{r[1]}.{r[2]}.{r[3]}')


def new_hex(n):
    output = hex(n)[2:]
    if len(output) == 1: output = '0' + output
    return output


result = do_dns_query(True)
for answer in result.answers:
    string = ''
    if answer.dns_type != 28: continue
    r = answer.rdata
    for i in range(len(r)):
        string += new_hex(r[i])
        if i % 2 == 1:
            string += ':'
    
    string = string[:-1]
    print(string)



