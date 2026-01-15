<?php
function pageheader(){
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<?php
$numargs = func_num_args();
$arg = func_get_args();
echo("$arg[0]\n$arg[1]\n");

echo('<link rel="STYLESHEET" type="text/css" href="/utils/main.css">');

?>
</head>
<body>
<div id="container">
<a href="/index.htm"><img id="Logo" alt="Scripture Creations" src="/g/ScriptureCreations.jpg"></a>
<div id="headerLinks">
	<ul>
		<li><a href="/Mission.htm">About Us</a> |</li>
		<li><a href="/Contact.htm">Contact Us</a></li>
	</ul>
</div>
<span id="Phone">Order by Phone: (801) 785-4964</span>


<div id="navigation">
	<ul>
	<li id="first"><a href="/Mission.htm">About Us</a></li>
	<li><a href="/Catalog.pdf">Catalog</a></li>
        <li><a href="/EvidencesForJosephSmith.htm">Evidences for Joseph Smith</a></li>
        <li><a href="/BookOfMormonGeographyMap.htm">Book of Mormon Map</a></li>
        <li><a href="/Signs.htm">Signs of the Times</a></li>
	<li><a href="/Contact.htm">Contact Us</a></li>
	</ul>
</div>
<div id="main">
<?php
}


function PageFooter(){
?>
<p><br></p>
<div id="footer"><div id="footerWrapper">
<br>	
	<ul id="footerSupportLinks">

		<li><A TARGET="_top" HREF="index.htm">Home</A> |</li>
		<li><A HREF="EvidencesForJosephSmith.htm">Joseph Smith</A> |</li>
		<li><A HREF="EvidencesfortheBookofMormon.htm">Book of Mormon</A> | </li>
		<li><A HREF="Signs.htm">Signs of the Times</A> |</li>
		<li><a href="/Contact.htm">Contact Us</a></li>
	</ul>
	<div id="footerBar">&copy; 2009 Scripture Creations, A publisher of LDS games, study aids and inspirational items. All rights reserved.</div>
</div></div>

</div>
</body>
</html>		
<?php
}
?>
