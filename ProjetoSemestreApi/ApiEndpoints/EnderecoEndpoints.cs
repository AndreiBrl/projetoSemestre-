using Microsoft.EntityFrameworkCore;
using ProjetoSemestreApi.context;
using ProjetoSemestreApi.models;

namespace ProjetoSemestreApi.ApiEndpoints;

public static class EnderecoEndpoints
{
    public static void MapEnderecoEndpoints(this WebApplication app)
    {
        app.MapGet("/enderecos", async (AppDbContext context) =>
        {
            return await context.Enderecos!.AsNoTracking().ToListAsync();
        });

        app.MapGet("/enderecos/{id:int}", async (AppDbContext context, int id) =>
        {
            var endereco = await context.Enderecos!.FirstOrDefaultAsync(e => e.Id == id);
            if(endereco == null)
            {
                return Results.NotFound();
            }

            return Results.Ok(endereco);
        });
       
        app.MapPost("/enderecos", async (Endereco endereco, AppDbContext context) =>
        {
            await context.Enderecos!.AddAsync(endereco);
            await context.SaveChangesAsync();
            return Results.Created($"/estabelecimentos/{endereco.Id}", endereco);
        }).RequireAuthorization("AdminMembroPolicy");


        app.MapPut("/enderecos/{id:int}", async (AppDbContext context, int id, Endereco endereco) =>
        {
            var enderecoDB = await context.Enderecos!.FirstOrDefaultAsync(e => e.Id == id);
            if (enderecoDB == null)
            {
                return Results.NotFound();
            }


            enderecoDB.Rua = endereco.Rua;
            enderecoDB.Bairro = endereco.Bairro;
            enderecoDB.Numero = endereco.Numero;
            enderecoDB.CEP = endereco.CEP;
            enderecoDB.Cidade = endereco.Cidade;
            enderecoDB.UF = endereco.UF;
            enderecoDB.Referencia = endereco.Referencia;


            await context.SaveChangesAsync();

            return Results.Ok(enderecoDB);

        }).RequireAuthorization("AdminMembroPolicy");

        app.MapDelete("/enderecos/{id:int}", async (AppDbContext context, int id) =>
        {
            var endereco = await context.Enderecos!.FirstOrDefaultAsync(e => e.Id == id);
            if (endereco == null)
            {
                return Results.NotFound();
            }
            context.Enderecos!.Remove(endereco);
            await context.SaveChangesAsync();

            return Results.NoContent();
        }).RequireAuthorization("AdminPolicy");

    }
}
