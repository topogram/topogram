// user-based privacy
Router.plugin('ensureSignedIn', {
  except: ['root', 'showTopogram', 'signIn', 'atSignIn', 'atSignUp', 'atForgotPassword', 'atResetPwd']
}) 

//UserAccounts Routes
AccountsTemplates.configureRoute('changePwd') 
AccountsTemplates.configureRoute('enrollAccount') 
AccountsTemplates.configureRoute('forgotPwd') 
AccountsTemplates.configureRoute('resetPwd') 
AccountsTemplates.configureRoute('signIn') 
AccountsTemplates.configureRoute('signUp') 
AccountsTemplates.configureRoute('verifyEmail') 
