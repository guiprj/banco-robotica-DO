$("#btnAdmin").click(function () {
  let isVibileAdmin = $(".admin").is(":visible");
  let isHiddenAdmin = $(".admin").is(":hidden");
  if (isVibileAdmin) {
    $(".admin").hide();
    $(".All").show();
  }
  if (isHiddenAdmin) {
    $(".admin").show();
    $(".All").hide();
  }
});

$("#btn5ano").click(function () {
  let isVibileAlunos5Ano = $(".Alunos5Ano").is(":visible");
  let isHiddenAlunos5Ano = $(".Alunos5Ano").is(":hidden");
  if (isVibileAlunos5Ano) {
    $(".Alunos5Ano").hide();
    $(".All").show();
  }
  if (isHiddenAlunos5Ano) {
    $(".Alunos5Ano").show();
    $(".All").hide();
  }
});

$("#btn6ano").click(function () {
  let isVibileAlunos6Ano = $(".Alunos6Ano").is(":visible");
  let isHiddenAlunos6Ano = $(".Alunos6Ano").is(":hidden");
  if (isVibileAlunos6Ano) {
    $(".Alunos6Ano").hide();
    $(".All").show();
  }
  if (isHiddenAlunos6Ano) {
    $(".Alunos6Ano").show();
    $(".All").hide();
  }
});

$("#btn7ano").click(function () {
  let isVibileAlunos7Ano = $(".Alunos7Ano").is(":visible");
  let isHiddenAlunos7Ano = $(".Alunos7Ano").is(":hidden");
  if (isVibileAlunos7Ano) {
    $(".Alunos7Ano").hide();
    $(".All").show();
  }
  if (isHiddenAlunos7Ano) {
    $(".Alunos7Ano").show();
    $(".All").hide();
  }
});

$("#btn8ano").click(function () {
  let isVibileAlunos8Ano = $(".Alunos8Ano").is(":visible");
  let isHiddenAlunos8Ano = $(".Alunos8Ano").is(":hidden");
  if (isVibileAlunos8Ano) {
    $(".Alunos8Ano").hide();
    $(".All").show();
  }
  if (isHiddenAlunos8Ano) {
    $(".Alunos8Ano").show();
    $(".All").hide();
  }
});

$("#btn9ano").click(function () {
  let isVibileAlunos9Ano = $(".Alunos9Ano").is(":visible");
  let isHiddenAlunos9Ano = $(".Alunos9Ano").is(":hidden");
  if (isVibileAlunos9Ano) {
    $(".Alunos9Ano").hide();
    $(".All").show();
  }
  if (isHiddenAlunos9Ano) {
    $(".Alunos9Ano").show();
    $(".All").hide();
  }
});

$(".btnMsgClose").click(function () {
  $(".modalBalanceError").hide();
});

$(".btnMsgClose").click(function () {
  $(".modalBalanceSuccess").hide();
});

function confirmDel(event, form) {
  event.preventDefault();

  let decision = confirm("Quer mesmo excluir esse pedido?");
  if (decision) {
    form.submit();
  }
}
console.log("Oii");
function confirmDelUser(event, form) {
  event.preventDefault();

  let decision = confirm("Quer mesmo excluir esse usuário?");
  if (decision) {
    form.submit();
  }
}

function confirmDelProduct(event, form) {
  event.preventDefault();

  let decision = confirm("Quer mesmo excluir esse produto?");
  if (decision) {
    form.submit();
  }
}

function confirmSuccess(event, form) {
  event.preventDefault();

  let decision = confirm("Quer mesmo confirmar esse pedido?");
  if (decision) {
    form.submit();
  }
}
confirmDelProduct;
