module.exports = function(app, passport){
    
    //Link for Home page
    app.get('/', function(req, res){
        res.render('index.ejs');
    });

    //show the login page here
    app.get('/login', function(req, res){
        res.render('login.ejs', { message : req.flash('loginMessage') });
    });
    //process the login form here
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile',
        failureRedirect : '/login',
        failureFlash : true
    }));

    //show the signup page here
    app.get('/signup', function(req, res){
        res.render('signup.ejs', { message : req.flash('signupMessage') });
    });
    //process the signup request
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile',
        failureRedirect : '/signup',
        failureFlash : true 
    }));

    //access the profile page
    app.get('/profile', isLoggedIn, function(req,res){
        res.render('profile.ejs', 
            { user : req.user }   //get the user out of template and pass to template
        );
    });

    //make the logout system
    app.get('/logout', function(req, res){
        req.logout();
        res.redirect('/');
    });

};

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
        
    else{
        res.redirect('/');
    }
};