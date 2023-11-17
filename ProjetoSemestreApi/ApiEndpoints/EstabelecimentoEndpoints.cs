using Microsoft.EntityFrameworkCore;
using ProjetoSemestreApi.context;
using ProjetoSemestreApi.models;
using System.Text.Json.Serialization;
using System.Text.Json;
using ProjetoSemestreApi.DTOs;

namespace ProjetoSemestreApi.ApiEndpoints;

public static class EstabelecimentoEndpoints
{
    public static void MapEstabelecimentoEndpoints(this WebApplication app)
    {

        app.MapGet("/estabelecimentos", async (AppDbContext context) =>
        {
            var estabelecimentos = await context.Estabelecimentos!.AsNoTracking().ToListAsync();

            var options = new JsonSerializerOptions
            {
                DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull
            };

            return Results.Json(estabelecimentos, options);

        });

        app.MapGet("/estabelecimentos/enderecos", async (AppDbContext context) =>
        {

            var resultado = await context.Estabelecimentos!.Include(e => e.Enderecos)
                                                            .Include(e => e.Usuario)
                                                            .AsNoTracking()
                                                            .Select(e => new
                                                            {
                                                                e.Id,
                                                                e.Nome,
                                                                e.Enderecos,
                                                                e.Funcionamento,
                                                                e.Contato,
                                                                e.Instagram,
                                                                Usuario = new RetornoUserDTO
                                                                {
                                                                    Nome = e.Usuario!.UserName!,
                                                                    Email = e.Usuario.Email!
                                                                }
                                                            })
                                                            .ToListAsync();

            return resultado;
        });

        app.MapGet("/estabelecimentos/{userId:guid}", async (AppDbContext context, string userId) =>
        {

            
            var estabelecimentosDoUsuario = await context.Estabelecimentos
                .Include(e => e.Enderecos)
                .Include(e => e.Usuario)
                .Where(e => e.UsuarioId == userId)
                .Select(e => new
                {
                    e.Id,
                    e.Nome,
                    e.Enderecos,
                    e.Funcionamento,
                    e.Contato,
                    e.Instagram,
                    Usuario = new RetornoUserDTO
                    {
                        Nome = e.Usuario!.UserName!,
                        Email = e.Usuario.Email!
                    }
                })
                .ToListAsync();

            if (estabelecimentosDoUsuario == null)
            {
                return Results.NotFound();
            }

            return Results.Ok(estabelecimentosDoUsuario);
        });


        app.MapGet("/estabelecimentos/{id:int}", async (AppDbContext context, int id) =>
        {
            var estabelecimento = await context.Estabelecimentos!.Include(e => e.Enderecos)
                                                                    .Include(e => e.Usuario)
                                                                    .Select(e => new
                                                                    {
                                                                        e.Id,
                                                                        e.Nome,
                                                                        e.Enderecos,
                                                                        e.Funcionamento,
                                                                        e.Contato,
                                                                        e.Instagram,
                                                                        Usuario = new RetornoUserDTO
                                                                        {
                                                                            Nome = e.Usuario!.UserName!,
                                                                            Email = e.Usuario.Email!
                                                                        }
                                                                    })
                                                                    .FirstOrDefaultAsync(e => e.Id == id);
            if (estabelecimento == null)
            {
                return Results.NotFound();
            }

            return Results.Ok(estabelecimento);
        });
        
        app.MapPost("/estabelecimentos", async (PostEstabelecimentoDTO estabelecimento, AppDbContext context) =>
        {
            var estabelecimentoDB = new Estabelecimento
            {
                Nome = estabelecimento.Nome,
                Funcionamento = estabelecimento.Funcionamento,
                Contato = estabelecimento.Contato,
                Instagram = estabelecimento.Instagram,
                UsuarioId = estabelecimento.UsuarioId
                
            };

            await context.Estabelecimentos!.AddAsync(estabelecimentoDB);
            await context.SaveChangesAsync();
            return Results.Created($"/estabelecimentos/{estabelecimentoDB.Id}", estabelecimento);
        }).RequireAuthorization("AdminMembroPolicy");

        app.MapPut("/estabelecimentos/{id:int}", async (AppDbContext context, int id, PutEstabelecimentoDTO estabelecimento) =>
        {
            var estabelecimentoDB = await context.Estabelecimentos!.FirstOrDefaultAsync(e => e.Id == id);
            if (estabelecimentoDB == null)
            {
                return Results.NotFound();
            }

            estabelecimentoDB.Id = estabelecimento.Id;
            estabelecimentoDB.Nome = estabelecimento.Nome;
            estabelecimentoDB.Instagram = estabelecimento.Instagram;
            estabelecimentoDB.Contato = estabelecimento.Contato;
            //estabelecimentoDB.Enderecos = estabelecimento.Enderecos;
            estabelecimentoDB.Funcionamento = estabelecimento.Funcionamento;
            estabelecimentoDB.UsuarioId = estabelecimento.UsuarioId;

            await context.SaveChangesAsync();

            return Results.Ok(estabelecimentoDB);

        }).RequireAuthorization("AdminMembroPolicy");

        app.MapDelete("/estabelecimentos/{id:int}", async (AppDbContext context, int id) =>
        {
            var estabelecimento = await context.Estabelecimentos!.FirstOrDefaultAsync(e => e.Id == id);
            if (estabelecimento == null)
            {
                return Results.NotFound();
            }
            context.Estabelecimentos!.Remove(estabelecimento);
            await context.SaveChangesAsync();

            return Results.NoContent();
        }).RequireAuthorization("AdminPolicy");


        
    }
}
