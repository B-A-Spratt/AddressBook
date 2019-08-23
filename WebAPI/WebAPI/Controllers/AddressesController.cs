using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/addresses")]
    [ApiController]
    [Produces("application/json")]
    public class AddressesController : ControllerBase
    {
        private readonly ApiContext context;

        public AddressesController(ApiContext context)
        {
            this.context = context;
        }

        // GET: api/addresses
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Address>>> GetAddress()
        {
            return await context.Address.FromSql("EXEC GetAddresses").ToListAsync();
        }

        // PUT: api/put
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAddress(int id, [FromBody] Address address)
        {
            if (id != address.Id)
            {
                return BadRequest();
            }

            if (AddressExists(id))
            {
                return NotFound();
            }

            await context.Address.FromSql("EXEC PutAddress @Id = {0}, @FirstName = {1}, @LastName = {2}, " +
                "@PhoneNumber = {3}, @PhoneType = {4}, @Group = {5}", address.Id, address.FirstName, address.LastName, address.PhoneNumber,
                address.PhoneType, address.Group).SingleAsync();

            return NoContent();
        }

        // POST: api/addresses
        [HttpPost]
        public async Task<ActionResult<Address>> PostAddress([FromBody] Address address)
        {
            address = await context.Address.FromSql("EXEC PostAddress @FirstName = {0}, @LastName = {1}, " +
                "@PhoneNumber = {2}, @PhoneType = {3}, @Group = {4}", address.FirstName,
                address.LastName, address.PhoneNumber, address.PhoneType, address.Group).SingleAsync();

            return CreatedAtAction("PostAddress", new { id = address.Id }, address);
        }

        // DELETE: api/addresses/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Address>> DeleteAddress(int id)
        {
            var address = await context.Address.FromSql("EXEC GetAddress @Id = {0}", id).SingleOrDefaultAsync();

            if (address == null)
            {
                return NotFound();
            }

            await context.Address.FromSql("EXEC DeleteAddress @Id = {0}", id).SingleAsync();

            return address;
        }

        private bool AddressExists(int id)
        {
            return context.Address.FromSql("EXEC GetAddress @Id = {0}", id).SingleOrDefault() == null;
        }
    }
}
