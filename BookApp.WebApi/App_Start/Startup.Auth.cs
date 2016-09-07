using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Owin;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.Google;
using Microsoft.Owin.Security.OAuth;
using Owin;
using BookApp.WebApi.Providers;
using BookApp.WebApi.Models;
using Microsoft.Owin.Security.Facebook;

namespace BookApp.WebApi
{
    public partial class Startup
    {
        public static OAuthAuthorizationServerOptions OAuthOptions { get; private set; }
        public static GoogleOAuth2AuthenticationOptions googleAuthOptions { get; private set; }
        public static FacebookAuthenticationOptions facebookAuthOptions { get; private set; }


        public static string PublicClientId { get; private set; }

        // For more information on configuring authentication, please visit http://go.microsoft.com/fwlink/?LinkId=301864
        public void ConfigureAuth(IAppBuilder app)
        {
            // Configure the db context and user manager to use a single instance per request
            app.CreatePerOwinContext(ApplicationDbContext.Create);
            app.CreatePerOwinContext<ApplicationUserManager>(ApplicationUserManager.Create);

            // Enable the application to use a cookie to store information for the signed in user
            // and to use a cookie to temporarily store information about a user logging in with a third party login provider
            app.UseCookieAuthentication(new CookieAuthenticationOptions());
            app.UseExternalSignInCookie(DefaultAuthenticationTypes.ExternalCookie);

            // Configure the application for OAuth based flow
            PublicClientId = "self";
            OAuthOptions = new OAuthAuthorizationServerOptions
            {
                TokenEndpointPath = new PathString("/Token"),
                Provider = new ApplicationOAuthProvider(PublicClientId),
                AuthorizeEndpointPath = new PathString("/api/Account/ExternalLogin"),
                AccessTokenExpireTimeSpan = TimeSpan.FromDays(14),
                // In production mode set AllowInsecureHttp = false
                AllowInsecureHttp = true
            };

            // Enable the application to use bearer tokens to authenticate users
            app.UseOAuthBearerTokens(OAuthOptions);

            // Uncomment the following lines to enable logging in with third party login providers
            //app.UseMicrosoftAccountAuthentication(
            //    clientId: "",
            //    clientSecret: "");

            //app.UseTwitterAuthentication(
            //    consumerKey: "",
            //    consumerSecret: "");

            //app.UseFacebookAuthentication(
            //    appId: "180831739011998",
            //    appSecret: "c658c2b5ff20ed1eb590f6d4ad4d6801");

            //app.UseGoogleAuthentication(new GoogleOAuth2AuthenticationOptions()
            //{
            //    ClientId = "376757155169-717snin2lghce6ohsfh36c72bsfnqhu5.apps.googleusercontent.com",
            //    ClientSecret = "n_9s1ehwaEEgjjBfWgZvVdVV"
            //});

            //Configure Google External Login
            googleAuthOptions = new GoogleOAuth2AuthenticationOptions()
            {
                ClientId = "376757155169-717snin2lghce6ohsfh36c72bsfnqhu5.apps.googleusercontent.com",
                ClientSecret = "n_9s1ehwaEEgjjBfWgZvVdVV",
                Provider = new GoogleAuthProvider()
            };
            app.UseGoogleAuthentication(googleAuthOptions);

            //Configure Facebook External Login
            facebookAuthOptions = new FacebookAuthenticationOptions()
            {
                AppId = "180831739011998",
                AppSecret = "c658c2b5ff20ed1eb590f6d4ad4d6801",
                Provider = new FacebookAuthProvider()
            };
            app.UseFacebookAuthentication(facebookAuthOptions);
        }
    }
}
