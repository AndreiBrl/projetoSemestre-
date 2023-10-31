using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProjetoSemestreApi.Migrations
{
    /// <inheritdoc />
    public partial class atualizando_Relacionamento_Enderecos : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Enderecos_EstabelecimentoId",
                table: "Enderecos");

            migrationBuilder.AlterColumn<string>(
                name: "Contato",
                table: "Estabelecimentos",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT");

            migrationBuilder.CreateIndex(
                name: "IX_Enderecos_EstabelecimentoId",
                table: "Enderecos",
                column: "EstabelecimentoId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Enderecos_EstabelecimentoId",
                table: "Enderecos");

            migrationBuilder.AlterColumn<string>(
                name: "Contato",
                table: "Estabelecimentos",
                type: "TEXT",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Enderecos_EstabelecimentoId",
                table: "Enderecos",
                column: "EstabelecimentoId",
                unique: true);
        }
    }
}
