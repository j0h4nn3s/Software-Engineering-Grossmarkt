// --- DOM elements --- //

// Type of current site
var site           = document.body.dataset.page;

// DOM elements: basic elements
var $container     = document.getElementById('container');							// Container wrapping the main content
var $tableListBody = document.getElementById('table-list-body');					// Table body which will be filled with content
var $modal         = document.getElementById('modal');								// Modal container

// DOM elements: product modal elements
var $productNameInput      = document.getElementById('product-name-input');			// Product: Name input
var $productNameOutput     = document.getElementById('product-name-output');		// Product: Name output
var $productAmountInput    = document.getElementById('product-amount-input');		// Product: Amount input
var $productAmountOutput   = document.getElementById('product-amount-output');		// Product: Amount output
var $productCategoryInput  = document.getElementById('product-category-input');		// Product: Category input
var $productCategoryOutput = document.getElementById('product-category-output');	// Product: Category output
var $productOriginInput    = document.getElementById('product-origin-input');		// Product: Origin input
var $productOriginOutput   = document.getElementById('product-origin-output');		// Product: Origin output
var $productBbdInput       = document.getElementById('product-bbd-input');			// Product: BBD input
var $productBbdOutput      = document.getElementById('product-bbd-output');			// Product: BBD output
var $productProducerInput  = document.getElementById('product-producer-input');		// Product: Producer input
var $productProducerOutput = document.getElementById('product-producer-output');	// Product: Producer output
var $productSupplierInput  = document.getElementById('product-supplier-input');		// Product: Supplier input
var $productSupplierOutput = document.getElementById('product-supplier-output');	// Product: Supplier output
var $productBuyingInput    = document.getElementById('product-buying-input');		// Product: Buying input
var $productBuyingOutput   = document.getElementById('product-buying-output');		// Product: Buying output
var $productSellingInput   = document.getElementById('product-selling-input');		// Product: Selling input
var $productSellingOutput  = document.getElementById('product-selling-output');		// Product: Selling output

// DOM elements: producer modal elements
var $externalNameInput     = document.getElementById('external-name-input');		// Producer & Supplier: Name input
var $externalNameOutput    = document.getElementById('external-name-output');		// Producer & Supplier: Name output
var $externalStreetInput   = document.getElementById('external-street-input');		// Producer & Supplier: Street input
var $externalStreetOutput  = document.getElementById('external-street-output');		// Producer & Supplier: Street output
var $externalZipInput      = document.getElementById('external-zip-input');			// Producer & Supplier: Zip code input
var $externalZipOutput     = document.getElementById('external-zip-output');		// Producer & Supplier: Zip code output
var $externalTownInput     = document.getElementById('external-town-input');		// Producer & Supplier: Town input
var $externalTownOutput    = document.getElementById('external-town-output');		// Producer & Supplier: Town output
var $externalCountryInput  = document.getElementById('external-country-input');		// Producer & Supplier: Country input
var $externalCountryOutput = document.getElementById('external-country-output');	// Producer & Supplier: Country output



// --- Event Listener --- //

// Toggle user dropdown menu
document.getElementById('navbar-user-info').addEventListener('click', function() {
	this.classList.toggle('active');
});



// --- Functions --- //

/**
 * Ajax funcionality for communicating with server
 * @param  {String}		type       Type of action (get / update / delete / create)
 * @param  {String}   	object     Data object which will be affected by action (product / producer / supplier)
 * @param  {URL}   		data       Data that should be send with ajax call
 * @param  {Function} 	callback   Function that will be called after successfull ajax call
 */
function ajax(type, object, data, callback) {

	// Create XHR object
	var xhr = new XMLHttpRequest();


	// Set ajax information
	var method = (type == 'GET') ? 'get' : 'post';
	xhr.open(method, '/php/' + type + '_' + object + '.php');

	// Wait on server response
	xhr.onreadystatechange = function() {

		// Check ajax status
		if(xhr.readyState === 4) {

			// Call callback function if response is ok, else print error
			if(xhr.status === 200) {
				if(callback !== undefined) {
					callback(xhr.responseText);
				}
			} else {
				alert('Fehler ' + xhr.status  + ' ist aufgetreten.\n\nBitte wenden Sie sich an Ihren IT-Support.');
			}
		}

	};

	// Start ajax request
	if(method == 'POST') {
		xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		xhr.send(data);
	} else {
		xhr.send();
	}

}

/**
 * Get all products, generate a table and print it into the HTML document
 */
function getProducts() {
	ajax('GET', 'products', null, createProductList);
}

/**
 * Get all producers, generate a table and print it into the HTML document
 */
function getProducers() {
	ajax('GET', 'producers', null, createExternalList);
}

/**
 * Get all suppliers, generate a table and print it into the HTML document
 */
function getSuppliers() {
	ajax('GET', 'suppliers', null, createExternalList);
}

/**
 * Get all categories, generate a select menu and print it into the modal edit view
 */
function getCategorySelect() {
	ajax('GET', 'categories', null, createCategorySelect);
}

/**
 * Get all producers, generate a select menu and print it into the modal edit view
 */
function getProducerSelect() {
	ajax('GET', 'producers', null, createProducerSelect);
}

/**
 * Get all suppliers, generate a select menu and print it into the modal edit view
 */
function getSupplierSelect() {
	ajax('GET', 'suppliers', null, createSupplierSelect);
}

/**
 * Dynamically creates a product list and prints it into the HTML document
 * @param  {JSON}   data   Server response data
 */
function createProductList(data) {

	// Create array from data
	var products = JSON.parse(data);

	// Create table content with product details
	var output = '';
	products.forEach(function(value) {
		output += 	'<tr data-id="' + value.id + '" data-name="' + value.name + '" data-amount="' + value.amount + '" data-category-id="' + value.category_id + '" data-category-name="' + value.category_name + '" data-origin="' + value.origin + '" data-bbd="' + value.bbd + '" data-supplier-id="' + value.supplier_id + '" data-supplier-name="' + value.supplier_name + '" data-producer-id="' + value.producer_id + '" data-producer-name="' + value.producer_name + '" data-buying="' + value.buying_price + '" data-selling="' + value.selling_price + '" class="table-list-row">' +
						'<td>' + value.name + '</td>' +
						'<td>' + value.amount + ' kg</td>' +
						'<td>' + value.category_name + '</td>' +
						'<td>' + value.buying_price + ' €</td>' +
						'<td>' + value.selling_price + ' €</td>' +
						'<td>' + (100000 + parseInt(value.id)) + '</td>' +
					'</tr>';
	});

	// Print table content to HTML
	$tableListBody.innerHTML = output;

	// Add event handler to rows in order to open a details modal on click
	var rows = document.getElementsByClassName('table-list-row');
	var length = rows.length;
	for(var i = 0; i < length; i++) {
		rows[i].addEventListener('click', function() {

			// Get modal content from data table and write it into the modal
			$productNameOutput.dataset.id = this.dataset.id;
			$productNameOutput.innerHTML = this.dataset.name;
			$productAmountOutput.innerHTML = this.dataset.amount;
			$productCategoryOutput.dataset.id = this.dataset.categoryId;
			$productCategoryOutput.innerHTML = this.dataset.categoryName;
			$productOriginOutput.innerHTML = this.dataset.origin;
			$productBbdOutput.innerHTML = this.dataset.bbd;
			$productProducerOutput.dataset.id = this.dataset.producerId;
			$productProducerOutput.innerHTML = this.dataset.producerName;
			$productSupplierOutput.dataset.id = this.dataset.supplierId;
			$productSupplierOutput.innerHTML = this.dataset.supplierName;
			$productBuyingOutput.innerHTML = this.dataset.buying;
			$productSellingOutput.innerHTML = this.dataset.selling;

			// Show modal
			modal.set('view');
			modal.toggle();

		});
	}

}

/**
 * Dynamically creates a producer or supplier list and prints it into the HTML document
 * @param  {JSON}   data   Server response data
 */
function createExternalList(data) {

	// Create array from data
	var external = JSON.parse(data);

	// Create table content with product details
	var output = '';
	external.forEach(function(value) {
		output += 	'<tr data-id="' + value.id + '" data-name="' + value.name + '" data-street="' + value.street + '" data-zip="' + value.zip_code + '" data-town="' + value.town + '" data-country="' + value.country + '" class="table-list-row">' +
						'<td>' + value.name + '</td>' +
						'<td>' + value.street + '</td>' +
						'<td>' + value.zip_code + '</td>' +
						'<td>' + value.town + '</td>' +
						'<td>' + value.country + '</td>' +
					'</tr>';
	});

	// Print table content to HTML
	$tableListBody.innerHTML = output;

	// Add event handler to rows in order to open a details modal on click
	var rows = document.getElementsByClassName('table-list-row');
	var length = rows.length;
	for(var i = 0; i < length; i++) {
		rows[i].addEventListener('click', function() {

			// Get modal content from data table and write it into the modal
			$externalNameOutput.dataset.id = this.dataset.id;
			$externalNameOutput.innerHTML = this.dataset.name;
			$externalStreetOutput.innerHTML = this.dataset.street;
			$externalZipOutput.innerHTML = this.dataset.zip;
			$externalTownOutput.innerHTML = this.dataset.town;
			$externalCountryOutput.innerHTML = this.dataset.country;

			// Show modal
			modal.set('view');
			modal.toggle();

		});
	}

}

/**
 * Fills out the category select within the modal edit view
 * @param  {JSON}   data   Server response data
 */
function createCategorySelect(data) {

	// Create array from data
	var categories = JSON.parse(data);

	// Create select with categories as options
	var output = '<option value="0">Auswählen ...</option>';
	categories.forEach(function(value) {
		output +=	'<option value="' + value.id + '">' + value.name + '</option>';
	});

	// Print options into modal select
	$productCategoryInput.innerHTML = output;

}

/**
 * Fills out the producer select within the modal edit view
 * @param  {JSON}   data   Server response data
 */
function createProducerSelect(data) {

	// Create array from data
	var producers = JSON.parse(data);

	// Create select with categories as options
	var output = '<option value="0">Auswählen ...</option>';
	producers.forEach(function(value) {
		output +=	'<option value="' + value.id + '">' + value.name + '</option>';
	});

	// Print options into modal select
	$productProducerInput.innerHTML = output;

}

/**
 * Fills out the supplier select within the modal edit view
 * @param  {JSON}   data   Server response data
 */
function createSupplierSelect(data) {

	// Create array from data
	var suppliers = JSON.parse(data);

	// Create select with categories as options
	var output = '<option value="0">Auswählen ...</option>';
	suppliers.forEach(function(value) {
		output +=	'<option value="' + value.id + '">' + value.name + '</option>';
	});

	// Print options into modal select
	$productSupplierInput.innerHTML = output;

}

/**
 * Modal object, containing all button event handlers, switching modal modes and toggling modal visibility
 */
var modal = function() {

	// DOM elements: Close buttons
	var $modalCloseBtn = document.getElementById('btn-modal-close');					// Modal close button

	// DOM elmeents: Edit buttons
	var $modalEditBtn = document.getElementById('btn-modal-edit');						// Modal edit button
	var $modalEditCancelBtn = document.getElementById('btn-modal-edit-cancel');			// Modal edit cancel button
	var $modalEditSaveBtn = document.getElementById('btn-modal-edit-save');				// Modal edit save button

	// DOM elements: Delete buttons
	var $modalDeleteBtn = document.getElementById('btn-modal-delete');					// Modal delete button
	var $modalDeleteCancelBtn = document.getElementById('btn-modal-delete-cancel');		// Modal delete cancel button
	var $modalDeleteConfirmBtn = document.getElementById('btn-modal-delete-confirm');	// Modal delete confirm button

	// DOM elements: New buttons
	var $modalNewBtn = document.getElementById('btn-add');								// Modal new button
	var $modalNewCancelBtn = document.getElementById('btn-modal-new-cancel');			// Modal new cancel button
	var $modalNewSaveBtn = document.getElementById('btn-modal-new-save');				// Modal new save button

	// Initialize event handler
	var init = function() {

		// Event listener: Close modal
		$modalCloseBtn.addEventListener('click', toggleModal);

		// Event listener: Edit an object
		$modalEditBtn.addEventListener('click', function() {
			setMode('edit');
		});

		// Event listener: Cancel object editing
		$modalEditCancelBtn.addEventListener('click', function() {
			setMode('view');
		});

		// Event listener: Save changed object
		$modalEditSaveBtn.addEventListener('click', function() {
			updateData(); // Updates data on server
			setViewMode();
			setMode('view');
		});

		// Event listener: Delete an object
		$modalDeleteBtn.addEventListener('click', function() {
			setMode('delete');
		});

		// Event listener: Cancel object deleting
		$modalDeleteCancelBtn.addEventListener('click', function() {
			setMode('view');
		});

		// Event listener: Confirm object deletion
		$modalDeleteConfirmBtn.addEventListener('click', function() {
			deleteData(); // Delete data on server
			toggleModal();
		});

		// Event listener: Create new object
		$modalNewBtn.addEventListener('click', function() {
			setMode('new');
			toggleModal();
		});

		// Event listener: Cancel object creating
		$modalNewCancelBtn.addEventListener('click', function() {
			toggleModal();
		});

		// Event listener: Save new object
		$modalNewSaveBtn.addEventListener('click', function() {
			createData(); // Save data on server
			toggleModal();
		});

	};

	// Toggle modal visibility
	var toggleModal = function() {
		$container.classList.toggle('blur');
		$modal.classList.toggle('visible');
	};

	// Switch between modal modes (only design whise)
	var setMode = function(mode) {

		// Check on mode
		if(mode == 'view') {

			// View mode: Object details can only ne viewed
			$modal.classList.add('view');
			$modal.classList.remove('edit');
			$modal.classList.remove('new');
			$modal.classList.remove('delete');

		} else if (mode == 'edit') {

			// Edit mode: Object details can be edited through inputs and selects
			setEditMode(site);
			$modal.classList.add('edit');
			$modal.classList.remove('view');

		} else if (mode == 'new') {

			// New mode: Object can be created through empty inputs and selects
			setNewMode();
			$modal.classList.add('new');
			$modal.classList.remove('view');

		} else {

			// Delete mode: Deletion warning dialog is visible
			$modal.classList.add('delete');

		}

	};

	// Set modal to edit mode (only data whise)
	var setEditMode = function() {

		// Check on object type
		if(site == 'products') {

			// Copy product details into edit mode inputs and selects
			$productNameInput.dataset.id = $productNameOutput.dataset.id;
			$productNameInput.value      = $productNameOutput.innerHTML;
			$productAmountInput.value    = $productAmountOutput.innerHTML;
			$productCategoryInput.value  = $productCategoryOutput.dataset.id;
			$productOriginInput.value    = $productOriginOutput.innerHTML;
			$productBbdInput.value       = $productBbdOutput.innerHTML;
			$productProducerInput.value  = $productProducerOutput.dataset.id;
			$productSupplierInput.value  = $productSupplierOutput.dataset.id;
			$productBuyingInput.value    = $productBuyingOutput.innerHTML;
			$productSellingInput.value   = $productSellingOutput.innerHTML;

		} else {

			// Copy producer or supplier details into edit mode inputs
			$externalNameInput.dataset.id = $externalNameOutput.dataset.id;
			$externalNameInput.value      = $externalNameOutput.innerHTML;
			$externalStreetInput.value    = $externalStreetOutput.innerHTML;
			$externalZipInput.value       = $externalZipOutput.innerHTML;
			$externalTownInput.value      = $externalTownOutput.innerHTML;
			$externalCountryInput.value   = $externalCountryOutput.innerHTML;

		}

	};

	// Set modal to view mode (only data whise)
	var setViewMode = function() {

		// Check on object type
		if(site == 'products') {

			// Copy back new product details into view mode
			$productNameOutput.innerHTML      = $productNameInput.value;
			$productAmountOutput.innerHTML    = $productAmountInput.value;
			$productCategoryOutput.dataset.id = $productCategoryInput.options[$productCategoryInput.selectedIndex].value;
			$productCategoryOutput.innerHTML  = $productCategoryInput.options[$productCategoryInput.selectedIndex].text;
			$productOriginOutput.innerHTML    = $productOriginInput.value;
			$productBbdOutput.innerHTML       = $productBbdInput.value;
			$productProducerOutput.dataset.id = $productProducerInput.options[$productProducerInput.selectedIndex].value;
			$productProducerOutput.innerHTML  = $productProducerInput.options[$productProducerInput.selectedIndex].text;
			$productSupplierOutput.dataset.id = $productSupplierInput.options[$productSupplierInput.selectedIndex].value;
			$productSupplierOutput.innerHTML  = $productSupplierInput.options[$productSupplierInput.selectedIndex].text;
			$productBuyingOutput.innerHTML    = $productBuyingInput.value;
			$productSellingOutput.innerHTML   = $productSellingInput.value;

		} else {

			// Copy back new producer or supplier details into view mode
			$externalNameOutput.innerHTML    = $externalNameInput.value;
			$externalStreetOutput.innerHTML  = $externalStreetInput.value;
			$externalZipOutput.innerHTML     = $externalZipInput.value;
			$externalTownOutput.innerHTML    = $externalTownInput.value;
			$externalCountryOutput.innerHTML = $externalCountryInput.value;

		}

	};

	// Set modal to new mode (only data whise)
	var setNewMode = function() {

		// Check on object type
		if(site == 'products') {

			// Clear all input fields and reset selects
			$productNameInput.value = '';
			$productAmountInput.value = '';
			$productCategoryInput.value = 0;
			$productOriginInput.value = '';
			$productBbdInput.value = '';
			$productProducerInput.value = 0;
			$productSupplierInput.value = 0;
			$productBuyingInput.value = '';
			$productSellingInput.value = '';

		} else {

			// Clear all input fields
			$externalNameInput.value = '';
			$externalStreetInput.value = '';
			$externalZipInput.value = '';
			$externalTownInput.value = '';
			$externalCountryInput.value = '';

		}

	};

	// Update data on server
	var updateData = function() {

		var data;

		// Check on object type
		if(site == 'products') {

			// Create data string in url form
			data = 	'id=' + $productNameInput.dataset.id +
					'&name=' + $productNameInput.value +
					'&amount=' + $productAmountInput.value +
					'&category=' + $productCategoryInput.options[$productCategoryInput.selectedIndex].value +
					'&origin=' + $productOriginInput.value +
					'&bbd=' + $productBbdInput.value +
					'&producer=' + $productProducerInput.options[$productProducerInput.selectedIndex].value +
					'&supplier=' + $productSupplierInput.options[$productSupplierInput.selectedIndex].value +
					'&selling=' + $productSellingInput.value +
					'&buying=' + $productBuyingInput.value;

			// Send data to server
			ajax('UPDATE', 'product', data, function() {

				// Reload product list so that all changes are visible
				getProducts();

			});

		} else {

			// Create data string in url form
			data = 	'id=' + $externalNameInput.dataset.id +
					'&name=' + $externalNameInput.value +
					'&street=' + $externalStreetInput.value +
					'&zip=' + $externalZipInput.value +
					'&town=' + $externalTownInput.value +
					'&country=' + $externalCountryInput.value;

			// Check on external type
			if(site == 'producers') {

				// Send data to server
				ajax('UPDATE', 'producer', data, function() {

					// Reload producer list so that all changes are visible
					getProducers();

				});

			} else {

				// Send data to server
				ajax('UPDATE', 'supplier', data, function() {

					// Reload suppliers list so that all changes are visible
					getSuppliers();

				});

			}

		}

	};

	// Create data on server
	var createData = function() {

		var data;

		// Check on object type
		if(site == 'products') {

			// Create data string in url form
			data = 	'&name=' + $productNameInput.value +
					'&amount=' + $productAmountInput.value +
					'&category=' + $productCategoryInput.options[$productCategoryInput.selectedIndex].value +
					'&origin=' + $productOriginInput.value +
					'&bbd=' + $productBbdInput.value +
					'&producer=' + $productProducerInput.options[$productProducerInput.selectedIndex].value +
					'&supplier=' + $productSupplierInput.options[$productSupplierInput.selectedIndex].value +
					'&selling=' + $productSellingInput.value +
					'&buying=' + $productBuyingInput.value;

			// Send data to server
			ajax('CREATE', 'product', data, function() {

				// Reload product list so that all changes are visible
				getProducts();

			});

		} else {

			// Create data string in url form
			data = 	'name=' + $externalNameInput.value +
					'&street=' + $externalStreetInput.value +
					'&zip=' + $externalZipInput.value +
					'&town=' + $externalTownInput.value +
					'&country=' + $externalCountryInput.value;

			// Check on external type
			if(site == 'producers') {

				// Send data to server
				ajax('CREATE', 'producer', data, function() {

					// Reload producer list so that all changes are visible
					getProducers();

				});

			} else {

				// Send data to server
				ajax('CREATE', 'supplier', data, function() {

					// Reload suppliers list so that all changes are visible
					getSuppliers();

				});

			}

		}

	};

	// Delete data on server
	var deleteData = function() {

		var data;

		// Check on object type
		if(site == 'products') {

			// Create data string in url form
			data = 'id=' + $productNameOutput.dataset.id;

			// Send data to server
			ajax('DELETE', 'product', data, function() {

				// Reload product list so that all changes are visible
				getProducts();

			});

		} else {

			// Create data string in url form
			data = 'id=' + $externalNameOutput.dataset.id;

			// Check on external type
			if(site == 'producers') {

				// Send data to server
				ajax('DELETE', 'producer', data, function() {

					// Reload producer list so that all changes are visible
					getProducers();

				});

			} else {

				// Send data to server
				ajax('DELETE', 'supplier', data, function() {

					// Reload supplier list so that all changes are visible
					getSuppliers();

				});

			}

		}

	};

	// Public API
	return {
		init: init,
		toggle: toggleModal,
		set: setMode
	};

}();



// --- Runs at page loading --- //

// Get data from server and initialize modal event handlers
switch(site) {

	// Product page
	case 'products':
		modal.init();
		getProducts();
		getCategorySelect();
		getProducerSelect();
		getSupplierSelect();
		break;

	// Producer page
	case 'producers':
		modal.init();
		getProducers();
		break;

	// Supplier page
	case 'suppliers':
		modal.init();
		getSuppliers();
		break;

	// Every other site
	default:
		break;

}
