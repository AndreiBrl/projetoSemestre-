namespace ProjetoSemestreApi.models;

public class Endereco
{
    public int Id { get; set; }
    public string? Rua { get; set; }
    public string? Bairro { get; set; }
    public string? Numero { get; set; }
    public long CEP { get; set; }
    public string? Cidade { get; set; }
    public string? UF { get; set; }
    public string? Referencia { get; set; }

    public int EstabelecimentoId { get; set; }
    public Estabelecimento? Estabelecimento { get; set; }

}