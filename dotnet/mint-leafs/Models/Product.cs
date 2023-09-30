namespace mint_leafs.Models;


public class Product
{
    public int Id { get; set; }
    public string? ProductName { get; set; }
    public string? ProductDescription { get; set; }
    public int? ProductPrice { get; set; }
    public int? ProductQuantity { get; set; }
    public string? ProductStatus { get; set; }
    public string? ProductImage { get; set; }
    public DateTime? Created_At { get; set; }
    public DateTime? Updated_At { get; set; }
    public int? CategoryId { get; set; }
    public Category Category { get; set; }
}
