<script lang="ts">
    import SubmitButton from "@src/components/SubmitButton.svelte";

    let report = {};
    let jsonFile: File | null = null; // Define the file variable
    let targetTable: string = "user"; // Default target table is 'user'

    // Handle generating the aggregate report
    async function generateReport() {
        try {
            const response = await fetch("/api/admin/report");
            if (!response.ok) {
                throw new Error("Failed to generate report");
            }
            report = await response.json();
            console.log(report);
            alert("Report generated successfully! Downloading...");
        } catch (error) {
            alert(`Error: ${error}`);
        }
        downloadReport();
    }

    // Handle downloading the aggregated report as a JSON file
    function downloadReport() {
        const jsonBlob = new Blob([JSON.stringify(report, null, 2)], {
            type: "application/json",
        });
        const url = URL.createObjectURL(jsonBlob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "aggregated_report.json";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    function onFileSelected(event: Event) {
        const target = event.target as unknown as { files: File[] };
        jsonFile = target?.files[0];
    }

    async function handleJSONUpload(event: Event) {
        event.preventDefault();
        if (!jsonFile) {
            alert("Please select a JSON file to upload");
            return;
        }

        // Check if a valid target table is selected
        if (!targetTable) {
            alert("Please select a target table for import");
            return;
        }

        const formData = new FormData();
        formData.append("file", jsonFile);
        formData.append("table", targetTable);

        try {
            const response = await fetch("/api/admin/import", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();

            if (!response.ok) {
                console.log(result)
                throw new Error(result.message || "Failed to import JSON data.");
            }

            alert(result.message || "JSON file imported successfully!");
        } catch (error) {
            alert(`${error}`);
        }
    }
</script>

<h1>Admin page!</h1>

<!-- Generate Aggregate Report -->
<SubmitButton onClick={generateReport}>Generate Report</SubmitButton>

<!-- JSON Upload Form -->
<form onsubmit={handleJSONUpload}>
    <label class="block" for="jsonFile">Upload JSON (Users or Posts)</label>
    <input
        type="file"
        id="jsonFile"
        onchange={onFileSelected}
        accept=".json"
        required
    />

    <label class="block" for="targetTable">Select Target Table</label>
    <select class="text-black" id="targetTable" value={targetTable} required>
        <option value="user">User</option>
        <option value="post">Post</option>
    </select>

    <SubmitButton type="submit">Import Data</SubmitButton>
</form>
