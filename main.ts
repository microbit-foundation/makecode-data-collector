function plotActivity (activitynum: number) {
    basic.showNumber(activitynum, 10)
}
datalogger.onLogFull(function () {
    basic.showIcon(IconNames.Skull)
    while (true) {
    	
    }
})
function countdown () {
    basic.clearScreen()
    for (let index = 0; index <= 2; index++) {
        music.play(music.tonePlayable(262, music.beat(BeatFraction.Half)), music.PlaybackMode.InBackground)
        imagesAnimation[index].showImage(0)
        basic.pause(400)
    }
    music.play(music.tonePlayable(523, music.beat(BeatFraction.Double)), music.PlaybackMode.InBackground)
    basic.showLeds(`
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        `)
}
input.onButtonPressed(Button.A, function () {
    if (!(logging)) {
        current_activity += 1
        if (current_activity > 7) {
            current_activity = 1
        }
        plotActivity(current_activity)
    }
})
function startActivity (activityNumber: number, totalSamples: number) {
    logging = true
    plotActivity(activityNumber)
    current_samples = 0
    buffer_a.fill(0);
buffer_x.fill(0);
buffer_y.fill(0);
buffer_z.fill(0);
t_previous_ms = input.runningTime()
    while (logging) {
        while (input.runningTime() < t_previous_ms + recording_period_ms) {
        	
        }
        t_current_ms = input.runningTime()
        buffer_a.setNumber(NumberFormat.Int16LE, current_samples * 2, t_current_ms - t_previous_ms)
buffer_x.setNumber(NumberFormat.Int16LE, current_samples * 2, input.acceleration(Dimension.X))
buffer_y.setNumber(NumberFormat.Int16LE, current_samples * 2, input.acceleration(Dimension.Y))
buffer_z.setNumber(NumberFormat.Int16LE, current_samples * 2, input.acceleration(Dimension.Z))
t_previous_ms = t_current_ms
        current_samples += 1
        if (current_samples >= totalSamples) {
            led.toggle(4, 0)
            datalogger.log(datalogger.createCV("a", "activity" + activityNumber))
            for (let index2 = 0; index2 <= totalSamples - 1; index2++) {
                datalogger.log(
                datalogger.createCV("a", buffer_a.getNumber(NumberFormat.Int16LE, index2 * 2)),
                datalogger.createCV("x", buffer_x.getNumber(NumberFormat.Int16LE, index2 * 2)),
                datalogger.createCV("y", buffer_y.getNumber(NumberFormat.Int16LE, index2 * 2)),
                datalogger.createCV("z", buffer_z.getNumber(NumberFormat.Int16LE, index2 * 2))
                )
            }
            music.play(music.builtinPlayableSoundEffect(soundExpression.spring), music.PlaybackMode.InBackground)
            logging = false
            plotActivity(activityNumber)
        }
        basic.pause(10)
    }
}
input.onButtonPressed(Button.AB, function () {
    if (!(logging)) {
        countdown()
        logging = true
    }
})
function checkerase () {
    if (input.buttonIsPressed(Button.B)) {
        basic.showIcon(IconNames.Heart)
        basic.pause(2000)
        if (!(input.buttonIsPressed(Button.B)) && input.buttonIsPressed(Button.A)) {
            basic.showIcon(IconNames.Skull)
            basic.pause(500)
            if (input.buttonIsPressed(Button.A)) {
                basic.showIcon(IconNames.Chessboard)
                datalogger.deleteLog(datalogger.DeleteType.Full)
                basic.showIcon(IconNames.Yes)
            }
        }
        basic.clearScreen()
    }
}
let logging = false
let imagesAnimation: Image[] = []
let recording_period_ms = 0
let current_activity = 0
let current_samples = 0
let t_previous_ms = 0
let t_current_ms = 0
current_activity = 1
recording_period_ms = 20
let activity_id_long = 5
let recording_time_seconds = 30
let recording_time_seconds_long = 80
let samples_per_activity = recording_time_seconds * 1000 / recording_period_ms
let samples_per_activity_long = recording_time_seconds_long * 1000 / recording_period_ms
imagesAnimation = [images.createImage(`
    . . . . .
    . . . . .
    . . # . .
    . . . . .
    . . . . .
    `), images.iconImage(IconNames.SmallSquare), images.iconImage(IconNames.Square)]
checkerase()
datalogger.includeTimestamp(FlashLogTimeStampFormat.None)
datalogger.mirrorToSerial(false)
datalogger.setColumnTitles(
"a",
"x",
"y",
"z"
)
let buffer_a = pins.createBuffer(samples_per_activity_long * 2)
let buffer_x = pins.createBuffer(samples_per_activity_long * 2)
let buffer_y = pins.createBuffer(samples_per_activity_long * 2)
let buffer_z = pins.createBuffer(samples_per_activity_long * 2)
plotActivity(current_activity)
loops.everyInterval(500, function () {
    if (logging) {
        for (let d_x = 0; d_x <= 4; d_x++) {
            for (let d_y = 0; d_y <= 4; d_y++) {
                if (led.pointBrightness(d_x, d_y) > 250) {
                    led.plotBrightness(d_x, d_y, 16)
                } else if (led.pointBrightness(d_x, d_y) > 1) {
                    led.plotBrightness(d_x, d_y, 255)
                }
            }
        }
    }
})
basic.forever(function () {
    if (logging) {
        if (current_activity < activity_id_long) {
            startActivity(current_activity, samples_per_activity)
        } else {
            startActivity(current_activity, samples_per_activity_long)
        }
    }
})
