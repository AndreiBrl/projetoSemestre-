using Microsoft.AspNetCore.Identity;

namespace ProjetoSemestreApi.Services;

public interface IAuthService
{
    Task AddToRole(IdentityUser user, string role);
}
