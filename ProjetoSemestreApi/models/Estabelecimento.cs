using Microsoft.AspNetCore.Identity;
using System.Text.Json.Serialization;

namespace ProjetoSemestreApi.models;

public class Estabelecimento
{
    public int Id { get; set; }
    public string? Nome { get; set; }
    public List<Endereco>? Enderecos { get; set; }
    public string? Funcionamento { get; set; }
    public string? Contato { get; set; }
    public string? Instagram { get; set; }

    //[JsonIgnore]
    public IdentityUser? Usuario { get; set; }
    public string? UsuarioId { get; set; }


}
