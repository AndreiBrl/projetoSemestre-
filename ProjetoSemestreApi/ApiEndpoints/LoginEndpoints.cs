using Microsoft.AspNetCore.Identity;
using ProjetoSemestreApi.DTOs;
using ProjetoSemestreApi.models;
using ProjetoSemestreApi.Services;
using System.Data;

namespace ProjetoSemestreApi.ApiEndpoints;

public static class LoginEndpoints
{
    public static void MapLoginEndpoints(this WebApplication app)
    {

        app.MapPost("/registro/membro", async (RegistroUserDTO model, UserManager<IdentityUser> _userManager, SignInManager<IdentityUser> _signInManager, RoleManager<IdentityRole> roleManager, IAuthService auth) => {

            var user = new IdentityUser
            {
                UserName = model.Nome,
                Email = model.Email,
            };

            var result = await _userManager.CreateAsync(user, model.Senha);
            if (!result.Succeeded)
            {
                return Results.BadRequest("Erro ao criar Usuário");
            }

            await auth.AddToRole(user, "membro");

            await _signInManager.SignInAsync(user, false);
            return Results.Ok();

        });

        app.MapPost("/registro/admin", async (RegistroUserDTO model, UserManager<IdentityUser> _userManager, SignInManager<IdentityUser> _signInManager, RoleManager<IdentityRole> roleManager, IAuthService auth) => {

            var user = new IdentityUser
            {
                UserName = model.Nome,
                Email = model.Email,
            };

            var result = await _userManager.CreateAsync(user, model.Senha);
            if (!result.Succeeded)
            {
                return Results.BadRequest("Erro ao criar Usuário");
            }

            await auth.AddToRole(user, "admin");

            await _signInManager.SignInAsync(user, false);
            return Results.Ok();

        });

        app.MapPost("/login", async (LoginUserDTO usermodel, SignInManager<IdentityUser> _signInManager,UserManager<IdentityUser> _userManager, ITokenService token) =>
        {

            var result = await _signInManager.PasswordSignInAsync(usermodel.Nome,
                usermodel.Senha, isPersistent: false, lockoutOnFailure: false);

            if (result.Succeeded)
            {
                var usuarioEncontrado = await _userManager.FindByNameAsync(usermodel.Nome);

                var roles = await _userManager.GetRolesAsync(usuarioEncontrado!);

                var usuario = new UserModel
                {
                    Id = usuarioEncontrado!.Id!,
                    Nome = usuarioEncontrado!.UserName!,
                    Email = usuarioEncontrado.Email!,
                    Senha = usuarioEncontrado.PasswordHash!

                };

                return Results.Json(new
                {
                    Data = new
                    {
                        Usuario = new
                        {
                            Login = usuarioEncontrado.UserName,
                            usuarioEncontrado.Email,
                            Roles = roles,
                            usuarioEncontrado.Id
                        },
                        Token = await token.GetToken(app.Configuration["Jwt:Key"]!, usuario)
                    }
                });

            }
            else
            {
                return Results.BadRequest("Login Inválidooooo");
            }

        });

    }
    

}
