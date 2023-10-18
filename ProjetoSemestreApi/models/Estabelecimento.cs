namespace ProjetoSemestreApi.models;

public class Estabelecimento
{
    public int Id { get; set; }
    public string? Nome { get; set; }
    public Endereco? Endereco { get; set; }
    public string? Funcionamento { get; set; }
    public int Contato { get; set; }
    public string? Instagram { get; set; }


}
