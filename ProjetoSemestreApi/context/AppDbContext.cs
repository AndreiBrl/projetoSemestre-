using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ProjetoSemestreApi.models;

namespace ProjetoSemestreApi.context;

public class AppDbContext : IdentityDbContext<IdentityUser>
{
    public AppDbContext(DbContextOptions options) : base(options)
    {
    }

    public DbSet<Estabelecimento>? Estabelecimentos { get; set; }
    public DbSet<Endereco>? Enderecos { get; set; }


    protected override void OnModelCreating(ModelBuilder mb)
    {
        mb.Entity<IdentityUserLogin<string>>().HasKey(login => new { login.LoginProvider, login.ProviderKey });
        mb.Entity<IdentityUserRole<string>>().HasKey(userRole => new { userRole.UserId, userRole.RoleId });
        mb.Entity<IdentityUserToken<string>>().HasKey(userToken => new { userToken.UserId, userToken.LoginProvider, userToken.Name });


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
