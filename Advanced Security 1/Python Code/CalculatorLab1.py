from tkinter import *

# This code is for Lab1 for Advanced Security 1. It is to make a 4 function calculator with a functional GUI.
#
# Author: Jade Brennan-Keane
# Student No: C18512336
# Course: TU857-4
from tkinter import messagebox

window = Tk()
window.title("Calculator")
window.geometry('200x150')

# # # # # # # # # variables # # # # # # # # #
val = ""
x = 0
operator = ""
# # # # # # # # # variables # # # # # # # # #


def clear():
    print("Values Cleared")
    global x
    global operator
    global val
    val = ""
    x = 0
    operator = ""
    lbl.config(text=val)


def one():
    print("1")
    global val
    val = val + "1"
    lbl.config(text=val)


def two():
    print("2")
    global val
    val = val + "2"
    lbl.config(text=val)


def three():
    print("3")
    global val
    val = val + "3"
    lbl.config(text=val)


def four():
    print("4")
    global val
    val = val + "4"
    lbl.config(text=val)


def five():
    print("5")
    global val
    val = val + "5"
    lbl.config(text=val)


def six():
    print("6")
    global val
    val = val + "6"
    lbl.config(text=val)


def seven():
    print("7")
    global val
    val = val + "7"
    lbl.config(text=val)


def eight():
    print("8")
    global val
    val = val + "8"
    lbl.config(text=val)


def nine():
    print("9")
    global val
    val = val + "9"
    lbl.config(text=val)


def zero():
    print("0")
    global val
    val = val + "0"
    lbl.config(text=val)


def plus():
    print("+")
    global x
    global operator
    global val
    x = float(val)
    operator = "+"
    val = val + "+"
    lbl.config(text=val)


def minus():
    print("-")
    global x
    global operator
    global val
    x = float(val)
    operator = "-"
    val = val + "-"
    lbl.config(text=val)


def multiply():
    print("*")
    global x
    global operator
    global val
    x = float(val)
    operator = "*"
    val = val + "*"
    lbl.config(text=val)


def divide():
    print("/")
    global x
    global operator
    global val
    x = float(val)
    operator = "/"
    val = val + "/"
    lbl.config(text=val)


def decimal():
    print(".")
    global val
    val = val + "."
    lbl.config(text=val)


def result():
    global x
    global operator
    global val
    val2 = val
    if operator == "+":
        y = float((val2.split("+")[1]))
        z = x + y
        val = str(z)
    elif operator == "-":
        y = float((val2.split("-")[1]))
        z = x - y
        val = str(z)
    elif operator == "*":
        y = float((val2.split("*")[1]))
        z = x * y
        val = str(z)
    elif operator == "/":
        y = float((val2.split("/")[1]))
        if y == 0:
            messagebox.showerror("Error", "Division by 0 Not Allowed")
            x == ""
            val = ""
        else:
            z = float(x/y)
            val = str(z)
    lbl.config(text=val)

    print(val)


lbl = Label(window, text=val)
lbl.grid(column=3, row=1)

btn = Button(window, text="ac", command=clear)
btn.grid(column=0, row=1)

# # # # # # # # # Buttons 7-9 # # # # # # # # #
btn = Button(window, text="7", command=seven)
btn.grid(column=0, row=2)

btn = Button(window, text="8", command=eight)
btn.grid(column=1, row=2)

btn = Button(window, text="9", command=nine)
btn.grid(column=2, row=2)
# # # # # # # # # Buttons 7-9 # # # # # # # # #


# # # # # # # # # Buttons 4-6 # # # # # # # # #
btn = Button(window, text="4", command=four)
btn.grid(column=0, row=3)

btn = Button(window, text="5", command=five)
btn.grid(column=1, row=3)

btn = Button(window, text="6", command=six)
btn.grid(column=2, row=3)
# # # # # # # # # Buttons 4-6 # # # # # # # # #


# # # # # # # # # Buttons 0-3 # # # # # # # # #
btn = Button(window, text="1", command=one)
btn.grid(column=0, row=4)

btn = Button(window, text="2", command=two)
btn.grid(column=1, row=4)

btn = Button(window, text="3", command=three)
btn.grid(column=2, row=4)

btn = Button(window, text="0", command=zero)
btn.grid(column=1, row=5)
# # # # # # # # # Buttons 1-3 # # # # # # # # #


# # # # # # # # # `functions` # # # # # # # # #
btn = Button(window, text="+", command=plus)
btn.grid(column=3, row=2)

btn = Button(window, text="-", command=minus)
btn.grid(column=3, row=3)

btn = Button(window, text="*", command=multiply)
btn.grid(column=3, row=4)

btn = Button(window, text="/", command=divide)
btn.grid(column=3, row=5)

btn = Button(window, text=".", command=decimal)
btn.grid(column=2, row=5)

btn = Button(window, text="=", command=result)
btn.grid(column=0, row=5)
# # # # # # # # # `functions` # # # # # # # # #

lbl = Label(window, text=val)
lbl.grid(column=3, row=1)

window.mainloop()
