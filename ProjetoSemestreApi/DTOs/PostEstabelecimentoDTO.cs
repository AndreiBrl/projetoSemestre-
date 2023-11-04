using Microsoft.AspNetCore.Identity;
using ProjetoSemestreApi.models;

namespace ProjetoSemestreApi.DTOs;

public class PostEstabelecimentoDTO
{
    public string? Nome { get; set; }
    public string? Funcionamento { get; set; }
    public string? Contato { get; set; }
    public string? Instagram { get; set; }
    public string? UsuarioId { get; set; }
}
