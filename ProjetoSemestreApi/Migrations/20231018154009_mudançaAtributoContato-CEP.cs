using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProjetoSemestreApi.Migrations
{
    /// <inheritdoc />
    public partial class mudançaAtributoContatoCEP : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Contato",
                table: "Estabelecimentos",
                type: "TEXT",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "Contato",
                table: "Estabelecimentos",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "TEXT");
        }
    }
}
