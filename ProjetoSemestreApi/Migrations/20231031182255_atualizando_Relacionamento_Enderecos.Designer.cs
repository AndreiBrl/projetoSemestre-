﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using ProjetoSemestreApi.context;

#nullable disable

namespace ProjetoSemestreApi.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20231031182255_atualizando_Relacionamento_Enderecos")]
    partial class atualizando_Relacionamento_Enderecos
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "7.0.12");

            modelBuilder.Entity("ProjetoSemestreApi.models.Endereco", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Bairro")
                        .HasColumnType("TEXT");

                    b.Property<int>("CEP")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Cidade")
                        .HasColumnType("TEXT");

                    b.Property<int>("EstabelecimentoId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Numero")
                        .HasColumnType("TEXT");

                    b.Property<string>("Referencia")
                        .HasColumnType("TEXT");

                    b.Property<string>("Rua")
                        .HasColumnType("TEXT");

                    b.Property<string>("UF")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("EstabelecimentoId");

                    b.ToTable("Enderecos");
                });

            modelBuilder.Entity("ProjetoSemestreApi.models.Estabelecimento", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Contato")
                        .HasColumnType("TEXT");

                    b.Property<string>("Funcionamento")
                        .HasColumnType("TEXT");

                    b.Property<string>("Instagram")
                        .HasColumnType("TEXT");

                    b.Property<string>("Nome")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Estabelecimentos");
                });

            modelBuilder.Entity("ProjetoSemestreApi.models.Endereco", b =>
                {
                    b.HasOne("ProjetoSemestreApi.models.Estabelecimento", "Estabelecimento")
                        .WithMany("Enderecos")
                        .HasForeignKey("EstabelecimentoId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Estabelecimento");
                });

            modelBuilder.Entity("ProjetoSemestreApi.models.Estabelecimento", b =>
                {
                    b.Navigation("Enderecos");
                });
#pragma warning restore 612, 618
        }
    }
}
