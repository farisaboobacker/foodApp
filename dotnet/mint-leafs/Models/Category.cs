namespace mint_leafs.Models;


public class Category
{
    public int Id { get; set; }
    public string? CategoryName { get; set; }
    public string? CategoryImage { get; set; }
    public string? CategoryStatus { get; set; }
    public DateTime? Created_At { get; set; }
    public DateTime? Updated_At { get; set; }

    public IEnumerable<Product> Products { get; set; }
}
