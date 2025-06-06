const User = require("../models/user.js")

module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup.ejs");
}

module.exports.signup = async(req, res) => {             // async because we are going to store it in Database.
    try {
        let{username, email, password} = req.body;
    const newUser = new User ({email, username});
    const registeredUser = await User.register(newUser, password);          // storing in Database.
    console.log(registeredUser);
    req.login(registeredUser, (err) => {                                    // if we signup then there is no need to login.
        if(err) {
            return next(err);
        }
        req.flash("success", "Welcome to Wanderlust!");
        res.redirect("/listings");
      });
    } catch(e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}

module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
}

module.exports.login = async(req, res) => {
    req.flash("success","welcome back to Wanderlust!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res) => {
    req.logout((err) => {
        if(err) {
            return next(err);
        }
        req.flash("success", "you are logged out!");
        res.redirect("/listings");
    })
}