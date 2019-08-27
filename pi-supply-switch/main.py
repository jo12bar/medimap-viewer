#!/usr/bin/env python
#
# main.py
#
# Uses a Pi Supply Switch for soft shutdowns and restarts.
# Hold the middle button for two seconds to restart, less to shut down.
#
# Heavily based off of:
# https://github.com/PiSupply/Pi-Supply-Switch/blob/master/softshut.py

from os import environ
from subprocess import call
import RPi.GPIO as GPIO
from time import sleep

SHUTDOWN_COMMAND = 'curl -X POST --header "Content-Type:application/json" "{}/v1/shutdown?apikey={}"'.format(environ['BALENA_SUPERVISOR_ADDRESS'], environ['BALENA_SUPERVISOR_API_KEY'])
REBOOT_COMMAND = 'curl -X POST --header "Content-Type:application/json" "{}/v1/reboot?apikey={}"'.format(environ['BALENA_SUPERVISOR_ADDRESS'], environ['BALENA_SUPERVISOR_API_KEY'])

# Map pin seven and eight on the Pi Switch PCB to chosen pins on the Pi's header
# The PCB numbering is refers to a legacy design of the board.
pinSeven = 7  # Middle button
pinEight = 11 # Red LED, capacitor

# Use board numbering
GPIO.setmode(GPIO.BOARD)

GPIO.setup(pinSeven, GPIO.IN)
GPIO.setup(pinEight, GPIO.OUT, initial=1)

# While button is not pressed:
while (GPIO.input(pinSeven) == False):
    # Wait for a rising edge on pinSeven:
    GPIO.wait_for_edge(pinSeven, GPIO.RISING)
    # Sleep 100ms to avoid shutting down due to random power surges:
    sleep(0.1)

# Sleep 2s to distinguish a long press from a short press
sleep(2)

if GPIO.input(pinSeven) == False:
    # Bring down pinEight so that the capacitor can discharge and eventually cut
    # power to the Pi
    GPIO.output(pinEight, 0)
    call(SHUTDOWN_COMMAND, shell=False)
else:
    call(REBOOT_COMMAND, shell=False)
