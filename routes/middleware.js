module.exports = {
  checkUserLoggedIn: async (req, res, next) => {
    let user = req.session.user

    console.log('path: ' + req.path)

    if (user != null) {
      console.log('user logged in')
      user = JSON.parse(user)
      user = Parse.Object.fromJSON(user)
      req.user = user
      next()
    } else {
      let path = req.path
      var allowed = ['/login', '/signup', '/success', '/lostpass', '/resendVerification']
      if ((allowed.indexOf(path) > -1)) {
        console.log('allowed path')
        next()
      } else {
        res.redirect('/')
      }

    }
  }
}