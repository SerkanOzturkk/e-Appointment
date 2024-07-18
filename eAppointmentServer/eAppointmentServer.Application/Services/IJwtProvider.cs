using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using eAppointmentServer.Domain.Entities;

namespace eAppointmentServer.Application.Services
{
    public interface IJwtProvider
    {
        string CreateToken(AppUser user);
    }
}
