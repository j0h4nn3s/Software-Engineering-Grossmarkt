# Projektbeschreibung

Die Software “Grossmarkt” soll für den Gemüsehändler “Zitrus” die Verwaltung und Organisation aller sich im Bestand befindlichen Produkte sowie Stammdaten übernehmen, mit dem Ziel, tägliche Arbeitsprozesse transparenter und effizienter zu gestalten.

Alle geforderten Implementierungen funktionieren in dieser Softwareversion einwandfrei.

*Entwickler: Dominique Müller, Johannes Hubert, Georg März*

---

# Datenbank-Konfiguration

Im Ordner `php` befindet sich die Datei `config.php`. Innerhalb dieser Datei lassen sich die Zugriffseinstellungen auf die MySQL-Datenbank konfigurieren.
Ein aktueller Dump der MySQL-Datenbank befindet sich in der Datei `grossmarkt_dump.sql`.

* `"SQL_HOST"` definiert die Adresse des Servers
* `"SQL_USER"` definiert den Benutzernamen der MySQL-Datenbank
* `"SQL_PASS"` definiert das Password des MySQL-Nutzers
* `"SQL_DB"` definiert das Schema innerhalb der MySQL-Datenbank

---

# Backend-API

Alle Server-Antworten sind in **JSON** formatiert.



## Daten abrufen (via GET)

### Alle Produkte
* Url: `php/get_products.php`
* Response: `id, name, amount, category_id, category_name, origin, bbd, producer_id, producer_name, supplier_id, supplier_name, buying_price, selling_price`

### Alle Produkt-Kategorien
* Url: `php/get_categories.php`
* Response: `id, name`

### Alle Produzenten
* Url: `php/get_producers.php`
* Response: `id, name, street, zip_code, town, country`

### Alle Lieferanten
* Url: `php/get_suppliers.php`
* Response: `id, name, street, zip_code, town, country`



## Daten aktualisieren (via POST)

### Ein Produkt
* Url: `php/update_product.php`
* Request: `id, name, amount, category [id], origin, bbd, producer [id], supplier [id], buying, selling`

### Einen Produzenten
* Url: `php/update_producer.php`
* Response: `id, name, street, zip_code, town, country`

### Einen Lieferanten
* Url: `php/update_producer.php`
* Response: `id, name, street, zip_code, town, country`



## Daten löschen (via POST)

### Ein Produkt
* Url: `php/delete_product`
* Request: `id`

### Einen Produzenten
* Url: `php/delete_producer`
* Request: `id`

### Einen Lieferanten
* Url: `php/delete_product`
* Request: `id`



## Daten erstellen (via POST)

### Ein Produkt
* Url: `php/create_products.php`
* Response: `name, amount, category [id], origin, bbd, producer [id], supplier [id], buying, selling`

### Einen Produzenten
* Url: `php/create_producers.php`
* Response: `name, street, zip_code, town, country`

### Einen Lieferanten
* Url: `php/create_suppliers.php`
* Response: `name, street, zip_code, town, country`
