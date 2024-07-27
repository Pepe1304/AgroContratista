
// @OneToOne: Relación uno a uno. Cada entidad tiene exactamente una instancia
// de la otra entidad.
// @ManyToOne: Relación muchos a uno. Muchas entidades de un tipo están
// asociadas con una entidad de otro tipo.
// @OneToMany: Relación uno a muchos. Una entidad está asociada con muchas
// instancias de otra entidad.
// @ManyToMany: Relación muchos a muchos. Muchas instancias de una entidad están
// asociadas con muchas instancias de otra entidad.

// Detalles Adicionales:
// mappedBy: Se utiliza para definir el propietario de la relación. Especifica
// el campo que es el propietario de la relación en la entidad inversa.
// @JoinColumn: Se utiliza para definir el nombre de la columna de la clave
// foránea en la base de datos.
// @JoinTable: Se utiliza en relaciones muchos a muchos para definir la tabla
// intermedia y las columnas de clave foránea.

// package agro.establecimientos.modelo;

// import java.util.List;
// import java.util.UUID;

// import agro.personas.modelo.PersonaModelo;
// import jakarta.persistence.Entity;
// import jakarta.persistence.GeneratedValue;
// import jakarta.persistence.Id;
// import jakarta.persistence.JoinColumn;
// import jakarta.persistence.OneToOne;
// import lombok.AllArgsConstructor;
// import lombok.Data;
// import lombok.NoArgsConstructor;

// @Entity(name = "establecimientos")
// @NoArgsConstructor
// @AllArgsConstructor
// @Data
// public class EstablecimientoModelo {

// @Id
// @GeneratedValue
// private UUID id;

// @OneToOne
// @JoinColumn(name = "id_persona", referencedColumnName = "id")
// private String nombre;
// private PersonaModelo persona;
// private String lugar;
// private List<String> lotes;
// private List<String> parcelas;
// }
