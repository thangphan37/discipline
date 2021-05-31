// color 1: global scope: WHITE

var studentAPI = (function studentAPI() {
  // color 2: studentAPI scope: BLUE
  var student
  var history = []

  return {
    setName(newStudent) {
      // color 3: setNameStudent scope: GREEN
      if (typeof newStudent === 'string') {
        // color 4: block scope: GREEN
        student = newStudent
        history.push(student)
      }
    },
    getName() {
      console.log('Student: ', student)
    },
    history() {
      // color 5: getHistory scope: ORANGE
      function reset() {
        history = []
      }

      function get() {
        if (history.length) {
          // color 6: block scope: YELLOW
          console.log('history:', history.join(','))
        } else {
          console.log('Noop! Nothing here.')
        }
      }

      return {reset, get}
    },
  }
})()

const history = studentAPI.history()

// interact name
studentAPI.setName('phan cong thang')
studentAPI.getName()

// interact history
history.get()
history.reset()
history.get()
