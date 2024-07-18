using eAppointmentServer.Domain.Entities;
using eAppointmentServer.Domain.Repositories;
using GenericRepository;
using Infrastructure.Context;

namespace eAppointmentServer.Infrastructure.Repositories;

internal class PatientRepository : Repository<Patient, ApplicationDbContext>, IPatientRepository
{
    public PatientRepository(ApplicationDbContext context) : base(context)
    {
    }
}