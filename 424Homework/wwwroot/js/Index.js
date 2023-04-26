$(() => {
    const newModal = new bootstrap.Modal($('#add-new')[0]);
    const editModal = new bootstrap.Modal($('#edit')[0]);

    function refreshTable() {
        $("tbody").empty();
        $.get('/home/getpeople', function (people) {
            people.forEach(function (person) {
                $("tbody").append(`<tr>
                <td>${person.firstName}</td>
                <td>${person.lastName}</td>
                <td>${person.age}</td>
                <td><button class="btn btn-primary" id="edit" data-edit-id="${person.id}">Edit</button></td>
            <td><button class="btn btn-danger" id="delete" data-delete-id="${person.id}">Delete</button></td>
            </tr>`);
            });
        });
    };
    refreshTable();

    $('#add-person').on('click', function () {
        $("#firstName").val('');
        $("#lastName").val('');
        $("#age").val('');
        newModal.show();
    });

    $('#save-person').on('click', function () {
        const firstName = $("#firstName").val();
        const lastName = $("#lastName").val();
        const age = $("#age").val();

        $.post('/home/addperson', { firstName, lastName, age }, function () {
            newModal.hide();
            refreshTable();
        })

    });

    $('tbody').on('click', '#delete', function () {
        const id = $(this).attr("data-delete-id");

        $.post('/home/delete', { id }, function () {
            refreshTable();
        });


    })

    $('tbody').on('click', '#edit', function () {
        const id = $(this).attr("data-edit-id");


        $.get('/home/getPersonForId', { id }, function (person) {
            $("#edit-firstName").val(person.firstName);
            $("#edit-lastName").val(person.lastName);
            $("#edit-age").val(person.age);
            $("#edit-id").val(person.id);

            editModal.show();

        });
    })

    $('#save-edit').on('click', function () {
       
        const firstName = $("#edit-firstName").val();
        const lastName = $("#edit-lastName").val();
        const age = $("#edit-age").val();
        const id = $("#edit-id").val();

        $.post('home/edit', { id, firstName, lastName, age }, function () {
            editModal.hide();
            refreshTable();
        })
    })



});