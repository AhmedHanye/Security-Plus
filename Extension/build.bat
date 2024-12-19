pnpm run build && for %%F in (dist\background\*.ts) do (
    echo Converting %%F to JavaScript...
    call tsc "%%F" --outDir "dist\background" --target "ES6" --module "ES6" >nul 2>&1
    del "%%F"
) && for %%F in (dist\background\*.js) do (
    echo Minifying %%F...
    call uglifyjs "%%F" -o "%%F" --compress --mangle
)
