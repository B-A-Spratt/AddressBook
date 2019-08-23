using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json.Serialization;

namespace WebAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }
        readonly string MyCorsPolicy = "MyCorsPloicy";

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<ApiContext>(o =>
                o.UseSqlServer(Configuration.GetConnectionString("DevConnection")));

            services.AddCors(o =>
            {
                o.AddPolicy(MyCorsPolicy,
                    b =>
                    {
                        b.WithOrigins("http://localhost:4200")
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                    });
            });

            services.AddHttpsRedirection(o =>
            {
                o.RedirectStatusCode = StatusCodes.Status308PermanentRedirect;
                o.HttpsPort = 44365;
            });

            services.AddMvc()
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_2)
                .AddJsonOptions(o =>
                {
                    var resolver = o.SerializerSettings.ContractResolver;

                    if (resolver != null)
                    {
                        (resolver as DefaultContractResolver).NamingStrategy = null;
                    }
                });

            services.AddSingleton(Configuration);
        }
        
        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseDatabaseErrorPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseCors(MyCorsPolicy);
            app.UseHttpsRedirection();
            app.UseMvc();


            
        }
    }
}
