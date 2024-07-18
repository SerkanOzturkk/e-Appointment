using eAppointmentServer.Domain.Entities;
using eAppointmentServer.Domain.Repositories;
using GenericRepository;
using Infrastructure.Context;

namespace eAppointmentServer.Infrastructure.Repositories;

internal class DoctorRepository : Repository<Doctor, ApplicationDbContext>, IDoctorRepository
{
    public DoctorRepository(ApplicationDbContext context) : base(context)
    {
    }
}