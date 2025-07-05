---
layout: none
---
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Redirecting...</title>
<script type="text/javascript">
  var lang = window.navigator.language || window.navigator.userLanguage;
  var base_url = "{{ site.baseurl | default: '' }}";

  if (lang.startsWith('ja')) {
    window.location.href = base_url + '/ja/';
  } else {
    window.location.href = base_url + '/en/';
  }
</script>
</head>
<body>
  <p>Redirecting to the correct language page...</p>
  <p>適切な言語のページにリダイレクトしています...</p>
</body>
</html>