using System.Collections.Generic;
using BookApp.WebApi.Entities;

namespace BookApp.WebApi.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;
    using BookApp.WebApi.Entities;

    internal sealed class Configuration : DbMigrationsConfiguration<BookApp.WebApi.Models.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
            ContextKey = "BookApp.WebApi.Models.ApplicationDbContext";
        }

        protected override void Seed(BookApp.WebApi.Models.ApplicationDbContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //    context.People.AddOrUpdate(
            //      p => p.FullName,
            //      new Person { FullName = "Andrew Peters" },
            //      new Person { FullName = "Brice Lambson" },
            //      new Person { FullName = "Rowan Miller" }
            //    );
            //

            if (context.Clients.Count() > 0)
            {
                return;
            }

            context.Clients.AddRange(BuildClientsList());
            context.SaveChanges();
        }

        private static List<Client> BuildClientsList()
        {

            List<Client> ClientsList = new List<Client>
            {
                new Client
                { Id = "BookApp",
                    Secret= Helper.GetHash("abc@123"),
                    Name="AngularJS front-end Application",
                    ApplicationType =  Models.ApplicationTypes.JavaScript,
                    Active = true,
                    RefreshTokenLifeTime = 7200,
                    AllowedOrigin = "http://localhost:9634"
                },
                new Client
                { Id = "consoleApp",
                    Secret=Helper.GetHash("123@abc"),
                    Name="Console Application",
                    ApplicationType = Models.ApplicationTypes.NativeConfidential,
                    Active = true,
                    RefreshTokenLifeTime = 14400,
                    AllowedOrigin = "*"
                }
            };

            return ClientsList;
        }
    }
    //}
}
