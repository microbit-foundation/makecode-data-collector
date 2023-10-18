# MakeCode project to collect accelerometer data

This project records the accelerometer data into the data logging storage.

An "activity number" from 1 to 7 can be selected, which will be identifiable in the data log.
Activities 1 to 4 record 30 seconds of accelerometer data, and activities 5 to 7 record 80 seconds.
Up to four 30 seconds activities, or two 80 second activities can be recorded.


## Instructions

- Press button A to change the "activity type", values from 1 to 7
    - Each button press increases the activity number by one, and loops over from 7 to 1
- Press buttons A+B to start logging the accelerometer data
    - A countdown will start with beeps and a display animation
    - At the 4th beep the logging will start
    - Activities 1 to 4 (both inclusive) will record data for 30 seconds, activities 5 to 7 for 80 seconds
    - During data recording the display will blink
    - When the data recording is done a Sound Expression will be played and the display will stop blinking
- When the data log is full a skull will appear on the display and nothing else can be done until erased

During the data recording, the data is initial stored in RAM, and when the recording time is finished it moves that data from RAM to the data logging storage.
The top right LED in the display will be ON while this data transfer occurs.
So, the total time before the activity looks "done" on the micro:bit (the display stops blinking and a Sound Expression is played) will be larger, usually about 50% longer, but it can vary.

As moving the data from RAM to data log storage is only done at the end, if the micro:bit is reset or the battery disconnected during data recording, the data for that activity will be lost.

While data collection is not taking place, it is safe to reset the micro:bit or completely remove power.
Any data logged so far will is saved and more data can be logged after reset (within the total limits previously mentioned).

### Erase the data

To erase the data logging data follow this sequence:
- Press down button B and keep it pressed
- Press and release the reset button
- A heart will appear on the display as the programme starts, release button B and press down button A
- A skull will appear on the display for 500 ms, maintain button A pressed down
- A chessboard will appear on the display, the data logging data will now be erased
- Button A can be released
- After the log deletion the programme will continue as normal


## Edit this project

To edit this repository in MakeCode.

* open [https://makecode.microbit.org/](https://makecode.microbit.org/)
* click on **Import** then click on **Import URL**
* paste **https://github.com/microbit-foundation/makecode-data-collector** and click import


## Running locally

```
git clone https://github.com/microbit-foundation/makecode-data-collector
cd makecode-data-collector
npm install pxt
npx pxt target microbit
npx pxt install
PXT_FORCE_LOCAL=1 PXT_NODOCKER=1 PXT_COMPILE_SWITCHES=csv---mbcodal npx pxt
```
