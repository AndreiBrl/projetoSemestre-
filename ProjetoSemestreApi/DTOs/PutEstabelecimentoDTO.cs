using Microsoft.AspNetCore.Identity;
using ProjetoSemestreApi.models;

namespace ProjetoSemestreApi.DTOs;

public class PutEstabelecimentoDTO
{
    public int Id { get; set; }
    public string? Nome { get; set; }
    public string? Funcionamento { get; set; }
    public string? Contato { get; set; }
    public string? Instagram { get; set; }
    public string? UsuarioId { get; set; }
}
