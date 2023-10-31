using Microsoft.EntityFrameworkCore;
using ProjetoSemestreApi.models;

namespace ProjetoSemestreApi.context;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions options) : base(options)
    {
    }

    public DbSet<Estabelecimento>? Estabelecimentos { get; set; }
    public DbSet<Endereco>? Enderecos { get; set; }


    protected override void OnModelCreating(ModelBuilder mb)
    {
        mb.Entity<Estabelecimento>().HasKey(e=>e.Id);

        mb.Entity<Endereco>().HasKey(e=>e.Id);


        mb.Entity<Endereco>()
            .HasOne<Estabelecimento>(e => e.Estabelecimento)
            .WithMany(end => end.Enderecos)
            .HasForeignKey(e => e.EstabelecimentoId);
        /*
        mb.Entity<Endereco>()
            .HasOne<Estabelecimento>(e => e.Estabelecimento)
            .WithMany(e => e.Enderecos)
            .HasForeignKey<Endereco>(e=>e.EstabelecimentoId);    
        */
    }
}
