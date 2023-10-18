using Microsoft.EntityFrameworkCore;
using ProjetoSemestreApi.context;
using ProjetoSemestreApi.models;

namespace ProjetoSemestreApi.ApiEndpoints;

public static class EstabelecimentoEndpoints
{
    public static void MapEstabelecimentoEndpoints(this WebApplication app)
    {
        app.MapGet("/estabelecimentos", async (AppDbContext context) =>
        {
            return await context.Estabelecimentos!.Include(e=>e.Endereco).AsNoTracking().ToListAsync();
        });

        app.MapGet("/estabelecimentos/{id:int}", async (AppDbContext context, int id) =>
        {
            var estabelecimento = await context.Estabelecimentos!.FirstOrDefaultAsync(e => e.Id == id);
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
            estabelecimentoDB.Endereco = estabelecimento.Endereco;
            estabelecimentoDB.Funcionamento = estabelecimento.Funcionamento;

            /*
            if (estabelecimento.Endereco != null)
            {
                estabelecimentoDB.Endereco!.Rua = estabelecimento.Endereco.Rua;
                estabelecimentoDB.Endereco.Bairro = estabelecimento.Endereco.Bairro;
                estabelecimentoDB.Endereco.Numero = estabelecimento.Endereco.Numero;
                estabelecimentoDB.Endereco.CEP = estabelecimento.Endereco.CEP;
                estabelecimentoDB.Endereco.Cidade = estabelecimento.Endereco.Cidade;
                estabelecimentoDB.Endereco.UF = estabelecimento.Endereco.UF;
                estabelecimentoDB.Endereco.EstabelecimentoId = estabelecimento.Id;
                estabelecimentoDB.Endereco.Referencia = estabelecimento.Endereco.Referencia;
            }
            */

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
