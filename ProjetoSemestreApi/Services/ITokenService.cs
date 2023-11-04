using ProjetoSemestreApi.models;

namespace ProjetoSemestreApi.Services
{
    public interface ITokenService
    {
         Task<string> GetToken(string key, UserModel usuario);
    }
}
