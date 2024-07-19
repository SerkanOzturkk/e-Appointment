using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;
using TS.Result;

namespace eAppointmentServer.Application.Features.Roles.RoleSync;

public sealed record RoleSyncCommand() : IRequest<Result<string>>;