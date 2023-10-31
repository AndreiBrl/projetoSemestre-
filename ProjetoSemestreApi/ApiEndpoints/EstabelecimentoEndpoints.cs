using Microsoft.EntityFrameworkCore;
using ProjetoSemestreApi.context;
using ProjetoSemestreApi.models;
using System.Text.Json.Serialization;
using System.Text.Json;

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
            return await context.Estabelecimentos!.Include(e=>e.Enderecos).AsNoTracking().ToListAsync();
        });

        app.MapGet("/estabelecimentos/{id:int}", async (AppDbContext context, int id) =>
        {
            var estabelecimento = await context.Estabelecimentos!.Include(e=>e.Enderecos).FirstOrDefaultAsync(e => e.Id == id);
            if(estabelecimento == null)
            {
                return Results.NotFound();
            }

            return Results.Ok(estabelecimento);
        });
        
        app.MapPost("/estabelecimentos", async (Estabelecimento estabelecimento, AppDbContext context) =>
        {
            await context.Estabelecimentos!.AddAsync(estabelecimento);
            await context.SaveChangesAsync();
            return Results.Created($"/estabelecimentos/{estabelecimento.Id}", estabelecimento);
        });

        app.MapPut("/estabelecimentos/{id:int}", async (AppDbContext context, int id, Estabelecimento estabelecimento) =>
        {
            var estabelecimentoDB = await context.Estabelecimentos!.FirstOrDefaultAsync(e => e.Id == id);
            if (estabelecimentoDB == null)
            {
                return Results.NotFound();
            }


            estabelecimentoDB.Nome = estabelecimento.Nome;
            estabelecimentoDB.Instagram = estabelecimento.Instagram;
            estabelecimentoDB.Contato = estabelecimento.Contato;
            estabelecimentoDB.Enderecos = estabelecimento.Enderecos;
            estabelecimentoDB.Funcionamento = estabelecimento.Funcionamento;

            await context.SaveChangesAsync();

            return Results.Ok(estabelecimentoDB);

        });

        app.MapDelete("/estabelecimentos/{id:int}", async (AppDbContext context, int id) =>
        {
            var estabelecimento = await context.Estabelecimentos!.FirstOrDefaultAsync(e => e.Id == id);
            if (estabelecimento == null)
            {
                return Results.NotFound();
            }
            context.Estabelecimentos.Remove(estabelecimento);
            await context.SaveChangesAsync();

            return Results.NoContent();
        });

        
    }
}
