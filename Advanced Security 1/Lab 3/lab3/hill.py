
keyMatrix = [[0] * 3 for i in range(2)]
messageVector = [[0] for i in range(2)]
cipherMatrix = [[0] for i in range(2)]


def getKeyMatrix(key):
    k = 0
    for i in range(2):
        for j in range(2):

            keyMatrix[i][j] = ord(key[k]) % 65
            k += 1

def encrypt(messageVector):
    for i in range(2):
        for j in range(1):
            cipherMatrix[i][j] = 0
            for x in range(2):
                cipherMatrix[i][j] += (keyMatrix[i][x] *
                                       messageVector[x][j])
            cipherMatrix[i][j] = cipherMatrix[i][j] % 26

def HillCipher(message, key):
    getKeyMatrix(key)
    for i in range(2):
        messageVector[i][0] = ord(message[i]) % 65
    encrypt(messageVector)
    CipherText = []
    for i in range(2):
        CipherText.append(chr(cipherMatrix[i][0] + 65))

    print("Ciphertext: ", "".join(CipherText))


message = "CAKE"
key = "BAKE"
HillCipher(message, key)


