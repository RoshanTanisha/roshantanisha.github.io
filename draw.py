from turtle import Turtle, Screen
from random import randint, randrange

SCREEN_SIZE = 750
PLANK_COUNT = 8
PINHEAD_SIZE = 5

FLOOR_COLOR = "white"
DEFAULT_COLOR = "black"
CROSSING_COLOR = "white"

screen = Screen()
screen.setup(SCREEN_SIZE, SCREEN_SIZE)
screen.bgcolor(FLOOR_COLOR)

# configure numbers to replicate Lazzarini's setup

NUMBER_PINS = 3408
PIN_LENGTH = 78.125
PLANK_WIDTH = screen.window_width() / PLANK_COUNT

def parallel_lines(turtle, width, height):

    turtle.penup()
    turtle.setheading(90)

    turtle.sety(height / -2)

    x_coordinates = []

    for i in range(PLANK_COUNT + 1):
        x = i * PLANK_WIDTH - width / 2

        turtle.setx(x)
        turtle.pendown()
        turtle.forward(height)
        turtle.penup()
        turtle.left(180)

        x_coordinates.append(x)

    return x_coordinates


pi = Turtle(visible=False)
pi.speed("fastest")

x_coordinates = parallel_lines(pi, screen.window_width(), screen.window_height())

#import sys
#sys.exit(0)

"""
def crosses(x0, x1, coordinates):
    for coordinate in coordinates:
        if x0 <= coordinate <= x1 or x1 <= coordinate <= x0:
            return True
    return False

previous_crossings = crossings = 0

max_coord = screen.window_width() / 2

for pin in range(NUMBER_PINS):
    x0, y0 = randint(-max_coord, max_coord), randint(-max_coord, max_coord)

    pi.color(DEFAULT_COLOR)
    pi.goto(x0, y0)
    #pi.dot(PINHEAD_SIZE)
    pi.setheading(randrange(360))
    pi.pendown()
    pi.forward(PIN_LENGTH)

    if crosses(x0, pi.xcor(), x_coordinates):
        pi.undo()
        pi.color(CROSSING_COLOR)
        #pi.dot(PINHEAD_SIZE)
        pi.forward(PIN_LENGTH)

        crossings += 1

    pi.penup()

    if previous_crossings != crossings:
        estimate = (2 * PIN_LENGTH * pin) / (PLANK_WIDTH * crossings)
        print(estimate)
        previous_crossings = crossings
"""
screen.exitonclick()
