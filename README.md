# MakeCode project to collect accelerometer data

Intructions:

- Press button A to change the "activity type", values from 1 to 7
    - Each button press increases the activity number by one, and loops over from 7 to 1
- Press buttons A+B to start logging the acceleromter data
    - A countdown will start with speaker beeps and an animation on the display
    - At the 4th beep the logging will start
    - Activities 1 to 4 (both inclusive) will record data for 30 seconds, activities 5 to 7 for 80 seconds
    - During data recording the display will blink
    - When the data recording is done a sound expression will be played and the display will stop blinking
- When the data log is full a skull will appear on the display
- To erase the data logging data follow this sequence:
    - Press button B
    - Press the reset button
    - A heart will appear on the display, release button B and press button A
    - A skull will appear on the display for 500 ms, maintain button A pressed down
    - A chessboard will appear on the display, the data logging data will now be erased
    - After this the programme will continue as normal

Due to memory limitations this programme can only reliable record 4 activities from 1 to 4, or 2 activities from 5 to 7.

During the data recording, the data is initial stored in RAM, and when the recording time is done it moves that data from RAM to the data logging storage.
As this is only done at the end, if the micro:bit is reset or the battery disconnected during data recording, the data for that activity will be lost.

## Edit this project

To edit this repository in MakeCode.

* open [https://makecode.microbit.org/](https://makecode.microbit.org/)
* click on **Import** then click on **Import URL**
* paste **https://github.com/microbit-carlos/makecode-data-collector** and click import

## Running locally

```
git clone https://github.com/microbit-carlos/makecode-data-collector
cd makecode-data-collector
npm install pxt
npx pxt target microbit
npx pxt install
PXT_FORCE_LOCAL=1 PXT_NODOCKER=1 PXT_COMPILE_SWITCHES=csv---mbcodal npx pxt
```
