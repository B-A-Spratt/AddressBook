using Microsoft.EntityFrameworkCore;
using WebAPI.Models;

namespace WebAPI
{
    public class ApiContext : DbContext
    {
        public ApiContext()
        {
            // intentionally left blank
        }

        public ApiContext(DbContextOptions<ApiContext> dbContextOptions) : base(dbContextOptions)
        {
            // intentionally left blank
        }

        public DbSet<Address> Address { get; set; }
    }
}
