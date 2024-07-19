using GenericRepository;
using Infrastructure.Context;

namespace eAppointmentServer.Infrastructure.Repositories
{
    internal sealed class UserRoleRepository : Repository<UserRoleRepository,ApplicationDbContext>
    {
        public UserRoleRepository(ApplicationDbContext context) : base(context)
        {
        }
    }
}
