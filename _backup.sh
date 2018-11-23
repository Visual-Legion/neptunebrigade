echo "initiating backup;"
git init
echo "remote origin?"
read origin
git remote add origin $origin
echo "remote origin was $origin"
git add .
echo "Added ."
echo "custom commit msg? default:backup"
read msg
if [ -z "$VAR" ]
	then git commit -m \"backup\"
	else git commit -m \"$msg\"
fi

git push -u origin master
echo "backup complete"